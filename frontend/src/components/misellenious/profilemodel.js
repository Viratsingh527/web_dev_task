import { ViewIcon } from '@chakra-ui/icons'
import { Button, IconButton, Image, Text, useDisclosure } from '@chakra-ui/react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, } from '@chakra-ui/react'
import React from 'react'
// import { ChatState } from '../../context/chatProvider'

const Profilemodel = ({ user, children }) => {
    // const { user } = ChatState()
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            {children ? (<span onClick={onOpen}>{children}</span>) : (
                <IconButton
                    display={{ base: 'flex' }}
                    icon={<ViewIcon />}
                    onClick={onOpen}
                />
            )}
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent height={'380px'}>
                    <ModalHeader bg="#79bfbc7d" style={{ textAlign: 'center' }} fontFamily={'work sans'}>{user.name}</ModalHeader>
                    <ModalCloseButton _hover={{ backgroundColor: 'red' }} />
                    <ModalBody
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'center'}
                        justifyContent={'space-between'}
                    >

                        <Image
                            borderRadius='full'
                            boxSize='150px'
                            src={user.pics}
                            alt={user.name}
                        />
                        <Text fontSize={{ base: '20px', md: '25px' }} fontFamily={'work sans'}>Email:{user.email} </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    )
}

export default Profilemodel
