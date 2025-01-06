import React from 'react';
import { Box, Text, Image, HStack, Avatar } from '@chakra-ui/react';
import Cookies from 'js-cookie';

export default function ImagePost({ post }) {
  const name = Cookies.get('name');
  const profile = Cookies.get('profileImage');

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" mb={4} boxShadow="1px 1px 10px #c9a1a1cf">
      <HStack spacing={4} mb={4} align="center">
        <Avatar
          name={name || 'User'}
          src={profile || 'https://bit.ly/broken-link'}
          fallbackSrc="https://bit.ly/broken-link"
        />
        <Text fontSize="lg" fontWeight="bold">
          {name || 'Anonymous User'}
        </Text>
      </HStack>

      <Text fontSize="md" color="gray.700" mb={4}>
        {post.caption}
      </Text>

      <Image src={post.imageUrl} alt="Post image" mb={4} borderRadius="md" />
    </Box>
  );
}
