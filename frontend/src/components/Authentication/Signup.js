import React, { useState } from 'react'
import { Input, VStack, FormControl, FormLabel, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
const Signup = () => {
    const [show, setShow] = useState(false)
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [pics, setPic] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast()
    const history = useHistory()

    const handleClick = () => { setShow(!show) }
    const postDetail = (pic) => {
        // fetch = ()
        setLoading(true);
        if (pic === undefined) {
            toast({
                title: 'image is not seleted!.',
                status: 'warning',
                duration: 9000,
                isClosable: true,
                position: 'bottom'
            })
            return;
        }
        if (pic.type === 'image/jpeg' || pic.type === 'image/jpg' || pic.type === 'image/png') {
            console.log(pic)
            const data = new FormData();
            data.append('file', pic)
            data.append('upload_preset', 'chat-app')
            data.append('cloud_name', 'virat-singh')
            fetch('https://api.cloudinary.com/v1_1/virat-singh/image/upload', {
                method: "post",
                body: data
            }).then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString());
                    console.log(data)
                    setLoading(false)
                }).catch((err) => {
                    console.log("image fail to uplaod")
                    console.log(err);
                    setLoading(false)
                })
        }
        else {
            toast({
                title: 'please select an image!.',
                status: 'warning',
                duration: 9000,
                isClosable: true,
                position: 'bottom'
            })
            setLoading(false)
            return;
        }
    }
    const submitHandler = async () => {
        setLoading(true)
        if (!name || !email || !password || !confirmPassword) {
            toast({
                title: 'No field should be empty!.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            setLoading(false)
            return;
        }
        if (password !== confirmPassword) {
            toast({
                title: 'confirmpassword should be equal to password.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            setLoading(false)
            return;
        }
        try {
            const config = { headers: { 'Content-Type': "application/json" } }
            const { data } = await axios.post('/api/user', { name, email, password, pics }, config)
            // console.log(data)
            if (data._id !== null) {
                console.log(data._id)
                toast({
                    title: 'Registration is successfull.',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom'
                })
                localStorage.setItem("userInfo", JSON.stringify(data))
                setLoading(false)

                history.push('/chats')
            }
            if (data._id == null) {
                toast({
                    title: 'user already exists ',
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom'
                })
                setLoading(false)
            }

        }
        catch (error) {
            toast({
                title: 'Error ocurred in registration',
                status: 'warning',
                description: error.response.data.message,
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            })
            setLoading(false)
        }
    }


    return (
        <VStack spacing={"5px"}>
            <FormControl id="name" isRequired>
                <FormLabel >Name</FormLabel>
                <Input placeholder='Enter your name'
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                />
            </FormControl>
            <FormControl id="email" isRequired>
                <FormLabel >Email</FormLabel>
                <Input placeholder='Enter your email'
                    onChange={(e) => {
                        setEmail(e.target.value)
                    }}
                />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel >Password</FormLabel>
                <InputGroup>
                    <Input
                        type={!show ? "password" : "text"}
                        placeholder='Enter your password'
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>

            </FormControl>
            <FormControl id="confirmPassword" isRequired>
                <FormLabel >Confirm Password</FormLabel>
                <InputGroup>
                    <Input
                        type={!show ? "password" : "text"}
                        placeholder='Confirm your password'
                        onChange={(e) => {
                            setConfirmPassword(e.target.value)
                        }}
                    />
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="pic" >
                <FormLabel>Upload Your Pic</FormLabel>
                <Input
                    type='file'
                    p={1.5}
                    accept='image/*'
                    onChange={(e) => { postDetail(e.target.files[0]) }}
                />
            </FormControl>
            <Button
                bg="#b2ccef"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >
                Sign up
            </Button>
        </VStack>
    )
}

export default Signup