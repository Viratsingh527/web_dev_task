import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>Page Not Found</Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Go to Home
      </Button>
    </Container>
  );
};

export default NotFound;
