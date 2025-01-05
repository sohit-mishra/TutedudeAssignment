import React, { useState } from 'react';
import { Box, Input, Button, FormControl, FormLabel, Heading, useToast } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function ConfirmPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      toast({
        title: 'Error',
        description: 'Both fields are required.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/reset-password`, 
        { token, password }
      );
      
      if (response.status === 200) {
        toast({
          title: 'Success',
          description: 'Password successfully changed. Please login.',
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
        Confirm Password
      </Heading>

      <FormControl mb="4" isRequired>
        <FormLabel>New Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your new password"
          focusBorderColor="teal.400"
        />
      </FormControl>

      <FormControl mb="4" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your new password"
          focusBorderColor="teal.400"
        />
      </FormControl>

      <Button 
        colorScheme="purple" 
        width="full" 
        onClick={handleSubmit} 
        mb="4" 
        isLoading={isLoading} 
        loadingText="Saving..."
      >
        Save Password
      </Button>
    </Box>
  );
}
