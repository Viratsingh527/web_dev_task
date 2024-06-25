import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const ChatList = ({ chats }) => {
  return (
    <List>
      {chats.map((chat, index) => (
        <ListItem key={index}>
          <ListItemText primary={chat.title} />
        </ListItem>
      ))}
    </List>
  );
};

export default ChatList;
