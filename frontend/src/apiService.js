import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjusted to your backend URL

export const getData = async () => {
  try {
    const response = await axios.get(`${API_URL}/data`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
