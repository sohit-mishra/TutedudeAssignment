import React, { useEffect, useState } from 'react';
import { Box, useToast, Heading, Spinner, Text } from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'js-cookie';
import ImagePost from './ImagePost';

export default function AllPost() {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true);
  const userId = Cookies.get('userId');
  const token = Cookies.get('token');
  const toast = useToast();

  const fetchPostData = async () => {
    if (!userId || !token) return;

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts/`);
      setData(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      toast({
        title: 'Error loading post data.',
        description: error.message || 'Failed to load posts.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId && token) {
      fetchPostData();
    } else {
      toast({
        title: 'User not logged in.',
        description: 'Please log in to see your posts.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    }
  }, [toast, userId, token]);

  return (
    <Box maxWidth="600px" mx="auto" p={4} >
      <Heading mb={6}>All Posts</Heading>

      {loading ? (
        <Box textAlign="center" py={6}>
          <Spinner size="xl" />
        </Box>
      ) : data.length === 0 ? (
        <Box textAlign="center" py={6}>
          <Text fontSize="lg" color="gray.600">
            No posts to display.
          </Text>
        </Box>
      ) : (
        data.map((post) => (
          <ImagePost key={post._id} post={post} />
        ))
      )}
    </Box>
  );
}
