import React, { useState } from 'react';
import { Box, Image, Text, Input, Button, VStack, useToast, FormControl } from '@chakra-ui/react';
import axios from 'axios';
import defaultImg from '../assets/upload.svg';
import Cookies from 'js-cookie';

export default function Post() {
  const token = Cookies.get('token');
  const [caption, setCaption] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUpload, setImageUpload] = useState(false);
  const [post, setPost] = useState(null);  
  const toast = useToast();

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setImageFile(response.data.imageUrl);
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

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handlePostSubmit = async () => {
    if (!imageFile || !caption) {
      toast({
        title: 'Error',
        description: 'Both image and caption are required!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/posts/create`, {
        imageUrl: imageFile,
        caption: caption
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        toast({
          title: 'Success',
          description: response.data.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        // Update the post state with the new post
        setPost({
          imageURL: response.data.imageUrl,
          caption: response.data.caption,
        });

        setCaption('');
        setImageFile(null); // Clear image after posting
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error?.response?.data?.message || 'Something went wrong. Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4} maxW="md" mx="auto" bg="white" borderRadius="md" boxShadow="1px 1px 10px #c9a1a1cf">
      <VStack spacing={4} align="stretch">
        <FormControl mb="4">
          <Box
            as="label"
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="400px"
            bg="black"
            overflow="hidden"
            borderRadius="20px"
            cursor="pointer"
            position="relative"
            textAlign="center"
            _hover={{ opacity: 0.8 }}
            margin="0 auto"
            objectFit={'cover'}
          >
            <Input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              display="none"
            />
            {imageFile ? (
              <Image
                src={imageUpload ? imageFile : ''} 
                objectFit="cover"
                width="100%" 
                height="100%" 
              />
            ) : (
              <Text color="white" fontSize="lg">Upload Image</Text> 
            )}
          </Box>
        </FormControl>

        <Input
          placeholder="Write a caption..."
          value={caption}
          onChange={handleCaptionChange}
          size="lg"
        />
        <Button colorScheme="blue" onClick={handlePostSubmit}>
          Post
        </Button>
      </VStack>

      {post && (
        <Box mt={6} borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" p={4}>
          <Image src={post.imageURL} alt="Post Image" borderRadius="lg" mb={4} />
          <VStack spacing={2} align="stretch">
            <Text fontWeight="bold" fontSize="lg">
              {post.caption}
            </Text>
          </VStack>
        </Box>
      )}
    </Box>
  );
}
