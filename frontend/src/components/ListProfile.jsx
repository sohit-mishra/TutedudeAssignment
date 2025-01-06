import React from 'react';
import { Box, Image, Text, Button, HStack } from '@chakra-ui/react';

export default function ListProfile({ name, id, profile, onSendRequest, status }) {
  return (
    <Box
      p={4}
      mb={4}
      borderWidth={1}
      borderRadius="md"
      boxShadow="1px 1px 10px #c9a1a1cf"
      display="flex"
      alignItems="center"
    >
      <Image
        src={profile}
        alt={name}
        boxSize="50px"
        borderRadius="full"
        objectFit="cover"
        mr={4}
      />
      <HStack align="start" spacing={1} alignItems={'center'} justifyContent={'space-between'} width="100%">
        <Text fontWeight="bold">{name}</Text>
        <Button
          colorScheme="blue"
          size="sm"
          onClick={() => onSendRequest(id)}  
        >
          {status ? `${status}` : 'Add Friend'}
        </Button>
      </HStack>
    </Box>
  );
}
