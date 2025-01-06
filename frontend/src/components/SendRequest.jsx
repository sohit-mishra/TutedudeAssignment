import React, { useState, useEffect } from 'react';
import { Box, Spinner, Text, Heading, useToast } from '@chakra-ui/react';
import ListProfile from './ListProfile';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function FriendRequest() {
  const UserId = Cookies.get('userId');
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = Cookies.get('token');
  const toast = useToast(); 

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/friend-requests/requests`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.data && response.data.length === 0) {
          setError('No friend request');
        } else {
          setFriends(response.data);
        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError('Session expired or invalid token. Please log in again.');
          Cookies.remove('token');
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } else {
          setError(err?.response?.data?.message || 'Error loading friends');
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchFriends();
    } else {
      setError('No valid token found. Please log in.');
      setLoading(false);
    }
  }, [token, navigate]);

  const fetchRequest = async (id) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/friend-requests/accept`,{userId:UserId, requestId:id}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log(response)

      
      toast({
        title: "Friend Request Accepted",
        description: "You have successfully accepted the friend request.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

    
      setFriends((prevFriends) => prevFriends.filter((friend) => friend.user.requestId !== id));

    } catch (err) {
      
      toast({
        title: "Error",
        description: err?.response?.data?.message || 'Failed to accept the friend request.',
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setError(err?.response?.data?.message || 'Error accepting friend request');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Heading>Friend Request</Heading>
        <Text>{error}</Text>
      </Box>
    );
  }

  console.log(friends);

  return (
    <Box>
      <Heading>Friend Requests</Heading>
      {friends.map((friend) => (
        <ListProfile
          key={friend._id}
          name={friend.sender.name}
          profile={friend.sender.profile}
          id={friend._id}
          status={friend.status}
          onSendRequest={() => fetchRequest(friend._id)}

        />
      ))}
    </Box>
  );
}
