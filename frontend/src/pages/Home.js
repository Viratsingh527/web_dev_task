import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>Welcome to the Chat App</Typography>
      <Button variant="contained" color="primary" component={Link} to="/register">
        Register
      </Button>
      <Button variant="contained" color="secondary" component={Link} to="/login" style={{ marginLeft: 10 }}>
        Login
      </Button>
    </Container>
  );
};

export default Home;
