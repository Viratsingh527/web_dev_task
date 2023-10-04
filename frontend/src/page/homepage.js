

import React, { useEffect } from 'react'
import { Container, Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import Login from '../components/Authentication/Login.js'
import Signup from '../components/Authentication/Signup.js'
import { useHistory } from 'react-router-dom'
const Homepage = () => {
  const history = useHistory();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'))
    if (user) {
      history.push('/chats')
      // console.log(user)
    }
  }, [history])
  return (
    <Container maxW="xl" centerContent>
      <Box
        display="flex"
        justifyContent="center"
        // alignItems={"center"}
        p={3}
        bg={"#000000"}
        w="100%"
        m="40px 0px 15px 0px"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" fontFamily="Black Ops One" color="white">
          Dark chat
        </Text>
      </Box>
      <Box w="100%" bg="black" borderRadius="lg" p={4} color="white" borderWidth="1px">
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab w="50%" fontFamily="Black Ops One">Login</Tab>
            <Tab w="50%" fontFamily="Black Ops One">Sign up</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default Homepage
