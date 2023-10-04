import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/chatProvider'
import { getSender, getSenderObject } from '../config/chatLogic'
import { ArrowBackIcon } from '@chakra-ui/icons'
import Profilemodel from './misellenious/profilemodel'
// import UserListItem from './misellenious/UserAvatar/UserListItem'
import UpdateGroupChat from './misellenious/UpdateGroupChat'
import axios from 'axios'
import './styles.css'
import ScrollableChat from './ScrollableChat'
import io from 'socket.io-client'
const ENDPOINT = "http://localhost:5000"
var socket, selectedChatCompare;

const SingleChat = ({ fetchChatAgain, setFetchChatAgain }) => {
    const user = JSON.parse(localStorage.getItem('userInfo'))
    const { selectedChat, setSelectedChat } = ChatState()
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessages, setNewMessages] = useState();
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const [selectedChatUser, setSelectedChatUser] = useState()
    const toast = useToast()

    // useEffect(() => {
    //     let filterUser = selectedChat.users.filter(item => item._id !== user._id)
    //     setSelectedChatUser(filterUser)
    // }, [selectedChat])

    // console.log(selectedChat)
    useEffect(() => {
        socket = io(ENDPOINT)
        socket.emit("setup", user)
        socket.on('connected', () => {
            setSocketConnected(true)
        })
        socket.on("typing", () => setIsTyping(true))
        socket.on('stop typing', () => setIsTyping(false))
    })

    const FetchMessages = async () => {
        if (!selectedChat) {
            return;
        }
        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            // console.log(selectedChat)
            const { data } = await axios.get(`/api/message/${selectedChat._id}`, config)
            setMessages(data)
            setLoading(false)

            socket.emit('join chat', selectedChat._id)
            console.log(messages);


        } catch (error) {
            toast({
                title: 'failed to load message',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top',
                description: error.message
            })
            setLoading(false)
        }
    }
    useEffect(() => {
        FetchMessages()
        selectedChatCompare = selectedChat
    }, [selectedChat])
    useEffect(() => {
        socket.on('messageReceived', (newMessage) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessage.chat._id) {

            } else {
                // FetchMessages()
                // setMessages((prevMessages) => [...prevMessages, newMessage]);
                setMessages([...messages, newMessage])
            }
        })
    })
    const sendMessage = async (event) => {
        if (event.key === 'Enter' && newMessages) {
            socket.emit('stop typing', selectedChat._id)

            try {
                const config = {
                    headers: {
                        'content-type': 'application/json',
                        Authorization: `Bearer ${user.token}`
                    }
                }
                setNewMessages('')
                const { data } = await axios.post('/api/message', {
                    chatId: selectedChat._id,
                    content: newMessages
                }, config)
                socket.emit('newMessage', data)
                // console.log(data)
                setMessages([...messages, data])

            } catch (error) {
                toast({
                    title: 'failed to send message',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                    description: error.message
                })
            }
        }
    };

    const typingHandler = (e) => {

        setNewMessages(e.target.value)
        if (!socketConnected) return;
        if (!typing) {
            setTyping(true)
            socket.emit('typing', selectedChat._id)
        }
        let lastTime = new Date().getTime()
        var timer = 3000;
        setTimeout(() => {
            // socket.emit('stop typing', selectedChat._id)
            // settyping(false)
            var latestTime = new Date().getTime()
            var timeDiff = latestTime - lastTime
            if (timeDiff >= timer && typing) {
                socket.emit('stop typing', selectedChat._id)
                setTyping(false)
            }
        }, timer)
    };
    return (
        <>
            {
                selectedChat ? (<>
                    <Text
                        fontSize={{ base: '27px', md: '30px' }}
                        py={3}
                        px={2}
                        w="100%"
                        fontFamily={'inherit'}
                        display={'flex'}
                        justifyContent={{ base: 'space-between' }}
                        alignItems={'center'}
                    >
                        <IconButton
                            display={{ base: 'flex', md: 'none' }}
                            icon={<ArrowBackIcon />}
                            onClick={() => setSelectedChat('')}
                        />
                        {
                            !selectedChat.isGroupChat ? <>
                                {getSender(user, selectedChat.users)}
                                <Profilemodel user={getSenderObject(user, selectedChat.users)} />
                            </> : <>
                                {selectedChat.chatName}
                                <UpdateGroupChat FetchMessages={FetchMessages} fetchChatAgain={fetchChatAgain} setFetchChatAgain={setFetchChatAgain} />
                            </>
                        }
                    </Text>
                    <Box
                        display={'flex'}
                        flexDir={'column'}
                        justifyContent={'flex-end'}
                        p={3}
                        bg={'grey'}
                        w='100%'
                        h='100%'
                        overflowY={'hidden'}
                        borderRadius={'lg'}
                        borderWidth={'2px'}
                    >
                        {loading ? <Spinner
                            size={'xl'}
                            alignSelf={'center'}
                            w={'30px'}
                            h={'30px'}
                            margin='auto'
                        /> : <div className='messages'> <ScrollableChat messages={messages} /></div>

                        }
                        <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                            {isTyping ? <div>typing...</div> : (<></>)}
                            <Input
                                bg='white'
                                variant={'filled'}
                                color='white'
                                onChange={typingHandler}
                                placeholder={'Enter message'}
                                value={newMessages} />
                        </FormControl>

                    </Box>
                </>) : (<Box display={'flex'} alignItems={'center'} justifyContent={'center'} height={'100%'}>
                    <Text fontSize={'25px'} fontWeight={'bold'}>Click any chat to start chats</Text>
                </Box>)
            }

        </>
    )
}

export default SingleChat
