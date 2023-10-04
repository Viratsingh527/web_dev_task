import { CloseIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/react'
import React from 'react'

const UserBadge = ({ user, handleFunction }) => {
    const loggeduser = JSON.parse(localStorage.getItem('userInfo'))

    return (
        <Box
            px={2}
            py={3}
            borderRadius={'lg'}
            m={1}
            mb={2}
            variant='solid'
            fontSize={12}
            bg='purple'
            color={'white'}
            cursor={'pointer'}
        // onClick={handleFunction}
        >
            {loggeduser._id != user._id ? user.name : 'You'}
            <CloseIcon ml={2} onClick={handleFunction} />
        </Box>
    )
}

export default UserBadge
