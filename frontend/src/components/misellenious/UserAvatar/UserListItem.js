import React from 'react'
import { ChatState } from '../../../context/chatProvider'
import { Avatar, Box, Button, Text } from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';
// import { color } from 'framer-motion';

const UserListItem = ({ users, handleFunction }) => {

    // const { user } = ChatState();
    return (
        <Box
            onClick={handleFunction}
            cursor={'pointer'}
            bg='#939393'
            _hover={{
                background: "#585656",
                color: "white",
            }}
            width={'100%'}
            display='flex'
            flexDirection={'row'}
            alignItems={'center'}
            p={3}
            mb='6px'
            color={'black'}
            borderRadius={'lg'}
        // isCloseable={true}
        >
            <Avatar
                mr={'9px'}
                size="sm"
                cursor="pointer"
                src={users.pics}
            />
            <Box>
                <Text>{users.name}</Text>
                <Text fontSize={'xs'}><b>Email:</b>{users.email}</Text>

            </Box>

        </Box>
    )
}

export default UserListItem
