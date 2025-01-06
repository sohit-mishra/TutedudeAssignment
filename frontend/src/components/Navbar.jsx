import React, { useContext } from 'react';
import {
  Box,
  Flex,
  HStack,
  Button,
  IconButton,
  Image,
  Text,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isAuthentication,
    name,
    profileImage,
    setToken,
    setIsAuthentication,
    setUserId,
    setName,
    setEmail,
    email,
    setProfileImage,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    onClose();
    navigate('/login');
  };

  const handleSignup = () => {
    onClose();
    navigate('/signup');
  };

  const logout = () => {
    onClose(); // Close the mobile drawer if open
    setToken(null);
    setIsAuthentication(false);
    setUserId('');
    setName('');
    setEmail('');
    setProfileImage('');
    Cookies.remove('token');
    Cookies.remove('userId');
    Cookies.remove('name');
    Cookies.remove('email');
    Cookies.remove('profileImage');
    Cookies.remove('Authentication');
    navigate('/login');
  };

  return (
    <Box
      bg="white"
      px={4}
      py={3}
      color="black"
      borderBottom="1px solid #ddd"
      boxShadow="0px 2px 5px #c5c5c5"
      position="sticky" // Added position sticky
      top={0} // Make sure it stays at the top
      zIndex={1000} // Ensures the navbar stays above other content
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box fontWeight="bold" fontSize="lg" onClick={() => navigate('/')}>
          MyLogo
        </Box>

        {/* Desktop Menu */}
        <HStack spacing={8} alignItems="center" display={{ base: 'none', md: 'flex' }}>
          {!isAuthentication ? (
            <>
              <Button colorScheme="purple" size="sm" onClick={handleLogin}>
                Login
              </Button>
              <Button colorScheme="purple" size="sm" onClick={handleSignup}>
                Signup
              </Button>
            </>
          ) : (
            <HStack spacing={4}>
              <Link to="/dashboard" onClick={onClose}>Dashboard</Link>
              <Image
                src={profileImage || 'https://via.placeholder.com/40'}
                alt="Profile"
                boxSize="40px"
                objectFit="cover"
                borderRadius="full"
              />
              <Text>{name}</Text>
              <Button colorScheme="red" size="sm" onClick={logout}>
                Logout
              </Button>
            </HStack>
          )}
        </HStack>

        {/* Mobile Menu Button */}
        <IconButton
          size="md"
          icon={<HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={onOpen}
        />
      </Flex>

      {/* Left Side Drawer for Mobile Menu */}
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {!isAuthentication ? (
                <>
                  <Button colorScheme="purple" onClick={handleLogin}>
                    Login
                  </Button>
                  <Button colorScheme="purple" onClick={handleSignup}>
                    Signup
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/dashboard" onClick={onClose}>Dashboard</Link>
                  <Image
                    src={profileImage || 'https://via.placeholder.com/100'}
                    alt="Profile"
                    boxSize="100px"
                    objectFit="cover"
                    borderRadius="full"
                    mx="auto"
                  />
                  <Text textAlign="center">{name}</Text>
                  <Text textAlign="center">{email}</Text>
                  <Button colorScheme="red" onClick={logout}>
                    Logout
                  </Button>
                </>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
