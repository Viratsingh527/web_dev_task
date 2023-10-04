import React from 'react'
import { ChatState } from '../context/chatProvider'
import { Box } from '@chakra-ui/react';
import SingleChat from './SingleChat';

const Chatbox = ({ fetchChatAgain, setFetchChatAgain }) => {
    const { selectedChat } = ChatState();
    return (
        <Box
            color={'black'}
            display={{ base: selectedChat ? 'flex' : 'none', md: 'flex' }}
            flexDir='column'
            alignItems={'center'}
            bg={'white'}
            w={{ base: '100%', md: '63%' }}
            borderRadius={'lg'}
            borderWidth={'1px'}
        >
            <SingleChat fetchChatAgain={fetchChatAgain} setFetchChatAgain={setFetchChatAgain} />
        </Box>
    )
}

export default Chatbox
