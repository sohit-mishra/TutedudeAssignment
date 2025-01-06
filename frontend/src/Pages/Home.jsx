import React from 'react'
import { Box, Grid, Image, Text, Button, Flex, Heading } from '@chakra-ui/react'
import HomeImg from '../assets/home.svg';

export default function Home() {
  return (
    <Box padding={4}>
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={6}>
        <Flex 
          alignItems="center" 
          justifyContent="center" 
          padding={4} 
          bg="#f5f5f5" 
          height="100%"
        >
          <Box textAlign="left">
            <Heading as="h1" size="2xl" mb={6} textAlign={'left'}>
              Your Ultimate Social Experience in One Web App
            </Heading>
            <Text mb={4} textAlign={'left'}>
              Join the conversation and be part of a vibrant online community. Start sharing your moments today and make meaningful connections that matter!
            </Text>
            <Button colorScheme="blue">Start Friend Request</Button>
          </Box>
        </Flex>
        <Flex alignItems="center" justifyContent="center" padding={4}>
          <Image src={HomeImg} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
        </Flex>
      </Grid>
    </Box>
  )
}
