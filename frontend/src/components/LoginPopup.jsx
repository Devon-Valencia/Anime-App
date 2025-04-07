import React, { useState } from 'react';
import { Box, Button, Input, Text } from '@chakra-ui/react';

const LoginPopup = ({ isOpen, onClose, onLogin }) => {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (username) {
      onLogin(username); 
      onClose(); 
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            padding: '2rem',
            borderRadius: '1rem',
            width: '500px',
            height: "500px",
            maxWidth: '90%',
            textAlign: 'center',
            backgroundColor: 'rgba(20, 19, 19, 0.9)'    
          }}
        >
          <Text color="white" mb={4}>Please enter your username:</Text>
          <Input
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            mb={4}
          />
          <Button onClick={handleLogin} colorScheme="blue" width="100%">
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default LoginPopup;
