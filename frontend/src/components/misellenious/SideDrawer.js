import {
    Box, Button, Menu, Text, Tooltip, MenuButton,
    MenuList,
    MenuItem,
    Avatar,
    MenuDivider,
    useToast,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Input,
    Spinner
} from '@chakra-ui/react'
import { BellIcon, ChatIcon, ChevronDownIcon, SpinnerIcon } from '@chakra-ui/icons'

import React, { useState } from 'react'
import { ChatState } from '../../context/chatProvider'
import Profilemodel from './profilemodel'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import axios from 'axios'
import ChatLoading from './chatLoading'
import UserListItem from './UserAvatar/UserListItem'

const SideDrawer = () => {
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState()
    // const { user, setSelectedChat, chats, setChats } = ChatState()
    const { setSelectedChat, chats, setChats } = ChatState()
    const history = useHistory();
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const user = JSON.parse(localStorage.getItem('userInfo'))
    // logout handler
    const logOutHandler = () => {
        localStorage.removeItem('userInfo')
        setChats([])
        setSelectedChat('')
        history.push('/')
    }

    //access chat with different users  
    const accessChat = async (userId) => {
        try {
            setLoadingChat(true)
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.post('/api/chat', { userId }, config)

            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats])

            setSelectedChat(data)
            setLoadingChat(false)
            onClose()
        } catch (error) {
            toast({
                title: 'Error to get chat',
                description: error.message,
                status: 'error',
                duration: 13000,
                isClosable: true,
                position: 'bottom-left'
            })
        }
    }

    //handler for searching user      
    const searchHandler = async () => {
        if (!search) {

            toast({
                title: 'Enter something to search',
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: 'top-left'
            })
            setSearchResult([])

            return;
        }
        try {
            setLoading(true)
            const config = {
                headers: { Authorization: `Bearer ${user.token}` }
            }

            const { data } = await axios.get(`/api/user?search=${search}`, config)
            setSearchResult(data);
            setTimeout(() => {
                setLoading(false)
            }, 500)
        } catch (error) {
            toast({
                title: 'There are no such user exist',
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position: 'top'
            })
            setTimeout(() => {

                setLoading(false)
            }, 500)
        }
    }
    const close_all = () => {
        setSearchResult([])
        setSearch('')
    }

    return (
        <>
            <Box
                display='flex'
                justifyContent="space-between"
                alignItems='center'
                bg="grey"
                width="100%"
                borderWidth="5px"
                p="5px 10px 5px 10px"
            >
                <Tooltip label="search friend for chat" hasArrow>
                    <Button onClick={onOpen} variant="ghost" bg="#808182">
                        <i className="fas fa-search" color="black"></i>
                        <Text display={{ base: 'none', md: "flex" }} p="9px">Find friends</Text>
                    </Button>
                </Tooltip>
                <Text fontSize='2xl' style={{ fontFamily: 'Black Ops One' }} color="black">Dark Chat</Text>
                <div style={{ padding: "8px" }}>
                    <Menu>
                        <MenuButton p={2} >
                            {/* <BellIcon fontSize='2xl' m="2px" /> */}
                            <ChatIcon fontSize='2xl' m="2px" />
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Notification</MenuItem>
                            <MenuDivider />
                            <MenuItem>message Request</MenuItem>
                            {/* <MenuItem>create</MenuItem>
                            <MenuItem>upload</MenuItem> */}
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} bg={'grey'} >
                            {/* {console.log(user.email)} */}
                            <Avatar
                                size="sm"
                                cursor="pointer"
                                src={user.pics}
                            // name={user.name}
                            />
                        </MenuButton>
                        <MenuList>
                            <Profilemodel user={user}>
                                <MenuItem color={'green'}>My profile</MenuItem>
                            </Profilemodel>
                            <MenuDivider />
                            <MenuItem color={'red'} onClick={logOutHandler}>Log out</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box >
            <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth={'2px'} textAlign={'center'} style={{ fontFamily: 'Black Ops One' }}>Friend finder</DrawerHeader>
                    <DrawerBody>
                        <Box display={'flex'} pd={2}>
                            <Input placeholder="Search friend "
                                value={search} onChange={(e) => { setSearch(e.target.value) }} />
                            <Button
                                onClick={searchHandler}
                            >
                                <i className="fas fa-search" color="black"></i>
                            </Button>
                        </Box>
                        {loading ? (
                            <ChatLoading />
                        ) : (
                            searchResult?.map((users) => (
                                <UserListItem
                                    key={users._id}
                                    users={users}
                                    handleFunction={() => accessChat(users._id)}
                                />)

                            ))}
                        {loadingChat && <Spinner ml='auto' dispaly="flex" />}
                    </DrawerBody>
                    <DrawerFooter>
                        <Button onClick={close_all} >clear search</Button>
                    </DrawerFooter>
                </DrawerContent>

            </Drawer>
        </>
    )
}

export default SideDrawer
