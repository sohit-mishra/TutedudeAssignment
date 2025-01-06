import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, HStack, Button, Image, useToast } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function FriendList() {
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState('');
  const toast = useToast();
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/friend-requests/friends`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.data && response.data.length === 0) {
          setError('No friends found');
        } else {
          setFriends(response.data);
        }
      } catch (err) {
        setError('Error loading friends');
        toast({
          title: 'Error',
          description: 'Could not load the friend list.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    if (token) {
      fetchFriends();
    } else {
      setError('No valid token found. Please log in.');
    }
  }, [token, toast]);

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
        {friends.map((friend) => (
          <HStack key={friend.id} spacing={4} p={4} borderWidth="1px" borderRadius="md" boxShadow="sm">
            <Image
              boxSize="50px"
              borderRadius="full"
              src={friend.profile || 'https://via.placeholder.com/150'}
              alt={`${friend.name}'s profile`}
            />
            <Text flex="1" fontWeight="bold">{friend.name}</Text>
            <Button colorScheme="blue">Message</Button>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}
