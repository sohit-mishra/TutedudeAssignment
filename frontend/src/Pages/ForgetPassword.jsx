import React, { useState } from 'react';
import { Box, Input, Button, FormControl, FormLabel, Heading, useToast, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email) {
      toast({
        title: 'Error',
        description: 'Please enter your email address.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: 'Error',
        description: 'Please enter a valid email address.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/forgot-password`, { email });
      

      if (response.status === 200) {
        toast({
          title: 'Success',
          description: 'Password reset link sent to your email.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/'); 
      }
    } catch (error) {
      
      toast({
        title: 'Error',
        description: error?.response?.data?.message || 'Something went wrong, please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false); 
    }
  };

  const handleSignup = () => {
    navigate('/signup');
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
        Forgot Password
      </Heading>

      <FormControl mb="4" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          focusBorderColor="purple.400"
        />
      </FormControl>

      <Button
        colorScheme="purple"
        width="full"
        onClick={handleSubmit}
        mb="4"
        isLoading={isLoading} 
        loadingText="Sending..."
      >
        Send Reset Link
      </Button>

      <Text textAlign="center">
        Don't have an account?{' '}
        <Button variant="link" onClick={handleSignup} colorScheme="purple">
          Sign Up
        </Button>
      </Text>
    </Box>
  );
}
