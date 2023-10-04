import { Box, Divider, FormControl, Input, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button
} from '@chakra-ui/react'
import { ChatState } from '../../context/chatProvider'
import axios from 'axios'
import UserListItem from './UserAvatar/UserListItem'
import UserBadge from './UserAvatar/UserBadge'

const GroupChatModel = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupName, setGroupName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState();
    const [searchResult, setSearchResult] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const { selectedChat, setSelectedChat, chats, setChats } = ChatState()
    const user = JSON.parse(localStorage.getItem('userInfo'))

    const handlesearch = async (query) => {
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
            // console.log(data)
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
    const submithandler = async () => {
        if (!groupName || !selectedUsers) {
            toast({
                title: "please fill the all fields",
                duration: 3000,
                status: "warning",
                isClosable: true,
                position: 'top'
            })
            return;
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.post('/api/chat/group', {
                name: groupName,
                users: JSON.stringify(selectedUsers.map(u => u._id)),
            }, config)
            setChats([data, ...chats])
            setSelectedChat(data)
            setSearchResult()
            setSelectedUsers([])
            setSearch()
            onClose()
            toast({
                title: `Group ${groupName} has created`,
                duration: 3000,
                status: "success",
                isClosable: true,
                position: 'bottom'
            })
        } catch (error) {
            toast({
                title: "failed to create group",
                duration: 3000,
                status: "warning",
                isClosable: true,
                position: 'top'
            })
        }
    }
    const handlegroup = async (userToAdd) => {
        if (selectedUsers.includes(userToAdd)) {
            toast({
                title: "User already added",
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: 'top'
            })
            return;
        }
        else {
            setSelectedUsers([...selectedUsers, userToAdd])
        }
    }
    const deleteUser = async (removeu) => {
        setSelectedUsers(selectedUsers.filter((sel) => sel._id != removeu._id))
    }
    const clearout = () => {
        setSearchResult()
        setSearch()
        setSelectedUsers([])
        onClose()
    }
    return (
        <>
            <span onClick={onOpen}>{children}</span>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader display={'flex'} fontSize='35px' justifyContent={'center'}>Create Group chat</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display={'flex'} flexDirection="column" alignItems={'center'}>
                        <FormControl>
                            <Input placeholder='Group name' mb={4} onChange={(e) => setGroupName(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <Input placeholder='Add users' mb={2} onChange={(e) => handlesearch(e.target.value)} />
                        </FormControl>
                        <Box display={'flex'} width='100%' flexWrap={'wrap'}>
                            {selectedUsers.map((u) => (
                                <UserBadge
                                    key={u._id}
                                    user={u}
                                    handleFunction={() => deleteUser(u)}
                                />
                            ))}
                        </Box>

                        {loading ? <div>Loading....</div> : (searchResult?.slice(0, 4).map((users) => (
                            <UserListItem
                                key={users._id}
                                users={users}
                                handleFunction={() => handlegroup(users)}
                            />
                        )))}
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' onClick={submithandler}>
                            Create group chat
                        </Button>
                        <Button variant='ghost' onClick={clearout}>Discard</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default GroupChatModel
