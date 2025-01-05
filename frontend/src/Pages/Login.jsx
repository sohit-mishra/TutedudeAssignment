import React, { useState } from 'react';
import { Box, Input, Button, FormControl, FormLabel, Heading, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!username || !password) {
      toast({
        title: 'Error',
        description: 'Please fill in both fields.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, {
        email : username,
        password,
      });

      const { token } = response.data;
     
      localStorage.setItem('authToken', token);

      toast({
        title: 'Success',
        description: response.data.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      navigate('/dashboard'); 
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Something went wrong!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleForgetPassword = () => {
    navigate('/forget-password');
  };

  return (
    <Box
      maxW={{ base: '90%', sm: '400px' }}
      mx="auto"
      mt="100px"
      mb="100px"
      p="8"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="1px 1px 10px #c9a1a1cf"
    >
      <Heading textAlign="center" mb="6" color="#7c5ad2">
        LOGIN
      </Heading>

      <FormControl mb="4" isRequired>
        <FormLabel>Username</FormLabel>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          focusBorderColor="teal.400"
        />
      </FormControl>

      <FormControl mb="4" isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          focusBorderColor="teal.400"
        />
      </FormControl>

      <Button colorScheme="purple" width="full" onClick={handleSubmit} mb="4">
        Login
      </Button>

      <Text textAlign="center">
        Don't have an account?{' '}
        <Button variant="link" onClick={handleSignup} colorScheme="purple">
          Sign Up
        </Button>
      </Text>

      <Text mt="4" textAlign="center">
        <Button variant="link" onClick={handleForgetPassword} colorScheme="purple">
          Forgot Password
        </Button>
      </Text>
    </Box>
  );
}
