import { Box, Button, FormControl, IconButton, Input, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons'
import { ChatState } from '../../context/chatProvider'
import UserBadge from './UserAvatar/UserBadge'
import axios from 'axios'
import UserListItem from './UserAvatar/UserListItem'

const UpdateGroupChat = ({ fetchChatAgain, setFetchChatAgain, FetchMessages }) => {
    const [groupName, setGroupName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState();
    const [searchResult, setSearchResult] = useState();
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);
    const toast = useToast();
    const { selectedChat, setSelectedChat } = ChatState()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const user = JSON.parse(localStorage.getItem('userInfo'))

    const handlegroup = async (userToAdd) => {
        if (selectedChat.users.find((u) => u._id === userToAdd._id)) {
            toast({
                title: "User already in group",
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: 'top'
            })
            return;
        }
        if (selectedChat.groupAdmin._id !== user._id) {
            toast({
                title: "only admin can add",
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: 'top'
            })
            return;
        }
        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.put('/api/chat/groupadd', {
                chatId: selectedChat._id,
                userId: userToAdd._id
            }, config)
            setLoading(false)
            setSelectedChat(data)
            setFetchChatAgain(!fetchChatAgain)
        }
        catch (error) {
            toast({
                title: 'failed to add in group',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top'
            })
            setLoading(false)
        }

    }

    const handleRename = async () => {
        if (!groupName) return;
        try {
            setRenameLoading(true)

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.put('/api/chat/rename', {
                chatId: selectedChat._id,
                chatName: groupName
            }, config)
            setSelectedChat(data)
            setFetchChatAgain(!fetchChatAgain)
            setRenameLoading(false)
        } catch (error) {
            toast({
                title: 'failed to rename group name',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top'
            })
            setRenameLoading(false)
            setGroupName('')
        }
    }
    const handleSearch = async (query) => {
        setSearch(query)
        if (!search) {
            return
        }
        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.get(`/api/user?search=${search}`, config)
            console.log(data)
            setSearchResult(data)
            setLoading(false)
        } catch (error) {
            toast({
                title: 'failed to load users',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
                description: error.message
            })
            setLoading(false)
        }
    }
    const handleRemove = async (userToRemove) => {
        if (selectedChat.groupAdmin._id !== user._id && userToRemove._id !== user._id) {
            toast({
                title: "only admin can remove",
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: 'top'
            })
            return;
        }
        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.put('/api/chat/groupremove', {
                chatId: selectedChat._id,
                userId: userToRemove._id
            }, config)

            setLoading(false)
            userToRemove._id === user._id ? setSelectedChat('') : setSelectedChat(data)
            setFetchChatAgain(!fetchChatAgain)
            FetchMessages()
            setSelectedChat(data)
        }
        catch (error) {
            toast({
                title: 'failed to remove from group',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top'
            })
            setLoading(false)
        }


    }
    return (
        <>


            <IconButton onClick={onOpen} icon={<ViewIcon />} />

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg="#79bfbc7d" style={{ textAlign: 'center' }} fontFamily={'work sans'}>{selectedChat.chatName}</ModalHeader>
                    <ModalCloseButton _hover={{ backgroundColor: 'red' }} />
                    <ModalBody>
                        <Box>
                            <Text textAlign='center' mb={2}>Members of group</Text>
                            <Text textAlign='center' mb={2} fontWeight='bold'>Group admin:{selectedChat.groupAdmin.name}</Text>

                            <Box display={'flex'} flexDirection="row" flexWrap={'wrap'}>
                                {selectedChat.users.map((u) => (
                                    <UserBadge
                                        key={u._id}
                                        user={u}
                                        handleFunction={() => handleRemove(u)}
                                    />
                                ))}

                            </Box>
                        </Box>
                        <FormControl display={'flex'}>
                            <Input placeholder='Type any name to rename'
                                mb={3}
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                            />
                            <Button
                                variant={'solid'}
                                isLoading={renameLoading}
                                onClick={handleRename}
                                colorScheme='teal'
                            >
                                update
                            </Button>
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder='Add user to group'
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>
                        {loading || !search ? <div></div> : (searchResult?.slice(0, 4).map((users) => (
                            <UserListItem
                                key={users._id}
                                users={users}
                                handleFunction={() => handlegroup(users)}
                            />
                        )))}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={() => handleRemove(user)}>
                            Leave group
                        </Button>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>


        </>
    )
}

export default UpdateGroupChat
