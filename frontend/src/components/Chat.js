import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { fetchMessages } from '../api';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const getMessages = async () => {
      const response = await fetchMessages();
      setMessages(response.data);
    };
    getMessages();
  }, []);

  const handleSend = () => {
    // Implement sending a message
  };

  return (
    <Container>
      <List>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemText primary={msg.text} secondary={msg.user} />
          </ListItem>
        ))}
      </List>
      <TextField
        label="New Message"
        fullWidth
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSend}>Send</Button>
    </Container>
  );
};

export default Chat;
