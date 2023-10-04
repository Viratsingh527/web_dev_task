import React, { useState } from 'react'
import { Input, VStack, FormControl, FormLabel, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast()
    const history = useHistory()

    const showHandle = () => { setShow(!show) }
    const submitHandler = async () => {
        setLoading(true)
        if (!email || !password) {
            toast({
                title: "No field should be empty",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom"
            })
            setLoading(false)
            return;
        }
        try {
            const config = { headers: { "Content-type": "application/json" } }
            const { data } = await axios.post('/api/user/login', { email, password }, config)
            toast({
                title: "logged in successfully",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: 'bottom'
            })
            localStorage.setItem('userInfo', JSON.stringify(data))
            setLoading(false)
            history.push('/chats')

        } catch (error) {
            toast({
                title: "Failed to login",
                description: error.response.data.message,
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "bottom"
            })
            setLoading(false)
        }
    }


    return (
        <VStack spacing={"5px"}>
            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={!show ? "password" : "text"}
                        placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={showHandle}>{show ? "Hide" : "Show"}</Button>
                    </InputRightElement>
                </InputGroup>

            </FormControl>
            <Button bg="#b2ccef"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >Login</Button>
        </VStack>
    )
}

export default Login
