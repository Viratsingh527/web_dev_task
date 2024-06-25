import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// User Registration
export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/user`, userData);
};

// User Login
export const loginUser = async (userData) => {
  return await axios.post(`${API_URL}/user/login`, userData);
};

// Send a Message
export const sendMessage = async (messageData) => {
  return await axios.post(`${API_URL}/message`, messageData);
};

// Get all Messages of a Chat
export const fetchMessages = async (chatId) => {
  return await axios.get(`${API_URL}/message/${chatId}`);
};

// Fetch all Chats
export const fetchChats = async () => {
  return await axios.get(`${API_URL}/chat`);
};

// Access Chats
export const accessChat = async (chatData) => {
  return await axios.post(`${API_URL}/chat`, chatData);
};

// Create Group Chat
export const createGroupChat = async (groupData) => {
  return await axios.post(`${API_URL}/chat/group`, groupData);
};

// Rename Group Chat
export const renameGroupChat = async (renameData) => {
  return await axios.post(`${API_URL}/chat/rename`, renameData);
};

// Add User to Group
export const addUserToGroup = async (groupData) => {
  return await axios.post(`${API_URL}/chat/groupadd`, groupData);
};

// Remove User from Group
export const removeUserFromGroup = async (groupData) => {
  return await axios.put(`${API_URL}/chat/groupremove`, groupData);
};
