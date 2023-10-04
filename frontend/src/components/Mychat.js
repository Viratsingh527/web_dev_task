import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/chatProvider'
import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { PlusSquareIcon, SmallAddIcon } from '@chakra-ui/icons'
import ChatLoading from '../components/misellenious/chatLoading'
import GroupChatModel from './misellenious/GroupChatModel'
const Mychat = ({ fetchChatAgain }) => {
    // const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState()
    const { selectedChat, setSelectedChat, chats, setChats } = ChatState()
    const user = JSON.parse(localStorage.getItem('userInfo'))
    const [loggedUser, setLoggedUser] = useState()

    const toast = useToast()
    const fetchChats = async () => {
        try {
            // console.log(user.token)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.get('/api/chat', config)
            // console.log(data)
            setChats(data);
        } catch (error) {
            toast({
                title: 'Failed to load chats',
                duration: 3000,
                description: error.message,
                status: 'error',
                position: 'bottom-left',
                isClosable: true
            })
        }
    }
    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem('userInfo')))
        fetchChats()
    }, [fetchChatAgain])

    const { getSender } = require('../config/chatLogic')
    return (
        <Box
            display={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }}
            flexDir={'column'}
            alignItems={'center'}
            p={3}
            bg={'white'}
            borderRadius={'lg'}
            width={{ base: '100%', md: '37%' }}
            borderWidth={'0px'}
            mr={2}
        >
            <Box display='flex'
                pd={'3px'}
                px={4}
                justifyContent={'space-between'}
                alignItems={'center'}

                fontSize={{ base: '17px', md: '20px' }}
                fontFamily={'work sans'}
                w='100%'
            >
                Messages
                <GroupChatModel>
                    <Button display='flex' variant='ghost'

                        fontSize={{ base: '12px', md: '17px', lg: '17px' }} rightIcon={<SmallAddIcon />}>
                        Create group
                    </Button>
                </GroupChatModel>

            </Box>
            <Box
                display={'flex'}
                p={3}
                w="100%"
                h='100%'
                flexDir={'column'}
                bg="grey"
                borderRadius={'lg'}
                overflow={'auto'}
            >
                {chats ? (
                    <Stack>
                        {
                            chats?.map((chat) => (
                                <Box
                                    onClick={() => setSelectedChat(chat)}
                                    cursor={'pointer'}
                                    bg={selectedChat === chat ? "green" : "white"}
                                    color={selectedChat === chat ? 'white' : 'black'}
                                    borderRadius={'lg'}
                                    borderWidth={'1px'}
                                    px={3}
                                    py={4}
                                    key={chat._id}
                                >
                                    <Text>
                                        {!chat.isGroupChat ? getSender(loggedUser, chat.users) : (chat.chatName)}
                                    </Text>
                                </Box>
                            ))
                        }
                    </Stack>
                ) : (
                    <ChatLoading />
                )}
            </Box>

        </Box>
    )
}

export default Mychat
