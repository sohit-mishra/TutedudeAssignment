import { Box, Spinner, Text, Heading } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import ListProfile from './ListProfile';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function FriendRecommendation() {
  const token = Cookies.get('token');
  const UserId = Cookies.get('userId');
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/recommendations/`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.data && response.data.length === 0) {
          setError('No friend recommendations available.');
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

  const Addfriend = async (id) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/friend-requests/send`, {
        receiverId: id,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data) {
        setFriends((prevFriends) => prevFriends.filter(friend => friend._id !== id));
        setError(null); 
      }
    } catch (err) {
      setError('Failed to send friend request');
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
        <Text color="red.500">{error}</Text>
      </Box>
    );
  }
  
  return (
    <Box p={4}>
      <Heading fontSize="xl" fontWeight="bold" mb={4}>
        Friend Recommendations
      </Heading>
      {friends.length > 0 ? (
        friends.map((friend) => (
          <ListProfile
            key={friend._id}
            name={friend.name}
            id={friend._id}
            profile={friend.profile}
            onSendRequest={() => Addfriend(friend._id)}
          />
        ))
      ) : (
        <Text color="gray.500">No friend recommendations available.</Text>
      )}
    </Box>
  );
}
