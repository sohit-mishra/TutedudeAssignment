import React, { useContext } from 'react';
import { Box, Flex, HStack, Button, IconButton, useDisclosure, Image } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { AuthContext } from '../context/AuthContext';  

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logout } = useContext(AuthContext);  

  return (
    <Box
      bg="white"
      px={4}
      py={3}
      color="black"
      borderBottom="1px solid #ddd"
      boxShadow={"0px 2px 5px #c5c5c5"}
      height={20}
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box fontWeight="bold" fontSize="lg">
          MyLogo
        </Box>
        <HStack spacing={8} alignItems="center">
       
          {!user ? (
            <>
              <Button colorScheme="purple" size="sm" display={{ base: 'none', md: 'inline-flex' }}>Login</Button>
              <Button colorScheme="purple" size="sm" display={{ base: 'none', md: 'inline-flex' }}>Signup</Button>
            </>
          ) : (
           
            <>
              <Image
                src={user.profilePicture}
                alt="Profile Image"
                boxSize="40px"
                objectFit="cover"
                borderRadius="full"
              />
              <Button colorScheme="red" size="sm" onClick={logout}>Logout</Button>
            </>
          )}
        </HStack>
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Toggle Navigation"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }} textAlign="center">
        
          {user && (
            <>
              <Image
                src={user.profilePicture} 
                alt="Profile Image"
                boxSize="100px"
                objectFit="cover"
                borderRadius="full"
                mx="auto"
                mb={4}
              />
              <Button colorScheme="red" size="sm" onClick={logout}>Logout</Button>
            </>
          )}
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
