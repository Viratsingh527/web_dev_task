import React, { useState, useEffect } from 'react'

import axios from 'axios'
import { ChatState } from '../context/chatProvider'
import { Box } from '@chakra-ui/react'
import SideDrawer from '../components/misellenious/SideDrawer'
import Mychat from '../components/Mychat'
import Chatbox from '../components/Chatbox'
import { useHistory } from 'react-router-dom'

const Chatpage = () => {
    // const { user } = ChatState()
    // console.log(user)//for testing
    // console.log("this is error")//for testing
    const user = JSON.parse(localStorage.getItem('userInfo'))

    const [fetchChatAgain, setFetchChatAgain] = useState(false)
    return <div style={{ width: "100%" }}>
        {user && <SideDrawer />}
        <Box
            display='flex'
            justifyContent='space-between'
            w="100%"
            h='92vh'
            p='10px'

        >
            {user && <Mychat fetchChatAgain={fetchChatAgain} />}
            {user && <Chatbox fetchChatAgain={fetchChatAgain} setFetchChatAgain={setFetchChatAgain} />}
        </Box>
    </div>



}

export default Chatpage