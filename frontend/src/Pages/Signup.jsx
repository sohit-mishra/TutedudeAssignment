import React, { useState } from 'react';
import { Box, Input, Button, FormControl, FormLabel, Heading, useToast, Text, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import defaultProfilePicture from '../assets/profileImage.jpg';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUpload, setImageUpload] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password || !name) {
      toast({
        title: 'Error',
        description: 'All fields are required.',
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

    if (password.length < 8) {
      toast({
        title: 'Error',
        description: 'Password must be at least 8 characters long.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, {
        name, email, password,profile: profilePicture
      });

      if (response.status === 201) {
        toast({
          title: 'Success',
          description: response.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        navigate('/login');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error?.response?.data?.message || 'Something went wrong. Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);

      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setProfilePicture(response.data.imageUrl);
        setImageUpload(true);

        if (response.status === 200) {
          toast({
            title: 'Success',
            description: 'Profile picture uploaded successfully.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: error?.response?.data?.message || 'Failed to upload profile picture.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box
      maxW={{ base: '90%', sm: '400px' }}
      mx="auto"
      mt="40px"
      mb="100px"
      p="8"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="1px 1px 10px #c9a1a1cf"
    >
      <Heading textAlign="center" mb="6" color="#7c5ad2">
        Create Account
      </Heading>

      <FormControl mb="4">
        <Box
          as="label"
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="full"
          boxSize="100px"
          overflow="hidden"
          cursor="pointer"
          position="relative"
          textAlign="center"
          _hover={{ opacity: 0.8 }}
          margin={'0 auto'}
        >
          <Input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            display="none"
          />
          {profilePicture ? (
            <Image
              src={imageUpload ? profilePicture :defaultProfilePicture}
              boxSize="100px"
              objectFit="cover"
              borderRadius="full"
              mixBlendMode="multiply"
              width="100%"
            />


          ) : (
            <Image
              src={defaultProfilePicture}
              alt="Default Profile"
              boxSize="100px"
              objectFit="cover"
              borderRadius="full"
              mixBlendMode={'multiply'}
              width={'100%'}
            />
          )}
        </Box>
      </FormControl>

      <FormControl mb="4" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your Name"
          focusBorderColor="teal.400"
        />
      </FormControl>

      <FormControl mb="4" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          focusBorderColor="teal.400"
        />
      </FormControl>

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

      <Button
        colorScheme="purple"
        width="full"
        onClick={handleSubmit}
        mb="4"
        isLoading={isLoading}
        loadingText="Signing up..."
      >
        Sign Up
      </Button>

      <Text textAlign="center">
        Already have an account?{' '}
        <Button variant="link" onClick={handleLogin} colorScheme="purple">
          Login
        </Button>
      </Text>
    </Box>
  );
}
