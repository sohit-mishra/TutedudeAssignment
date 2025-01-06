import React, { useState } from 'react';
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, Flex, useBreakpointValue, Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import FriendList from '../components/FriendList';
import SendRequest from '../components/SendRequest';
import FriendRecommendation from '../components/FriendRecommendation';
import Post from '../components/Post';
import PostUser from '../components/PostUser';
import AllPost from '../components/AllPost';

export default function Dashboard() {
  const tabOrientation = useBreakpointValue({ base: 'horizontal', md: 'vertical' }); // Adjust for horizontal tabs on mobile, vertical on desktop
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <Flex direction={{ base: 'column', md: 'row' }} height="100vh" overflow="hidden">
      {/* Sidebar for desktop */}
      <Box
        display={{ base: 'none', md: 'block' }} // Hide sidebar on mobile
        width="250px"
        position="sticky"
        left="0"
        top="0"
        height="100vh"
        borderRight="1px solid #ddd"
        paddingTop={4}
      >
        <Tabs
          variant="enclosed"
          colorScheme="teal"
          orientation="vertical" // Vertical tabs for desktop
          isFitted
          index={selectedTabIndex}
          onChange={(index) => setSelectedTabIndex(index)}
        >
          <TabList>
            <Tab _selected={{ bg: 'teal.500', color: 'white' }}>All Posts</Tab>
            <Tab _selected={{ bg: 'teal.500', color: 'white' }}>Create Post</Tab>
            <Tab _selected={{ bg: 'teal.500', color: 'white' }}>My Posts</Tab>
            <Tab _selected={{ bg: 'teal.500', color: 'white' }}>Friends</Tab>
            <Tab _selected={{ bg: 'teal.500', color: 'white' }}>Friend Requests</Tab>
            <Tab _selected={{ bg: 'teal.500', color: 'white' }}>Recommendation Friend</Tab>
          </TabList>
        </Tabs>
      </Box>

      {/* Main Content Area */}
      <Box
        flex="1"
        padding={4}
        height="100vh"
        overflowY="auto"
        marginTop={{ base: 0, md: 0 }}
      >
        {/* Mobile dropdown menu for tabs */}
        {tabOrientation === 'horizontal' && (
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme="teal" width="full" mb={4}>
              Select a Tab
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setSelectedTabIndex(0)}>All Posts</MenuItem>
              <MenuItem onClick={() => setSelectedTabIndex(1)}>Create Post</MenuItem>
              <MenuItem onClick={() => setSelectedTabIndex(2)}>My Posts</MenuItem>
              <MenuItem onClick={() => setSelectedTabIndex(3)}>Friends</MenuItem>
              <MenuItem onClick={() => setSelectedTabIndex(4)}>Friend Requests</MenuItem>
              <MenuItem onClick={() => setSelectedTabIndex(5)}>Recommendation Friend</MenuItem>
            </MenuList>
          </Menu>
        )}

        {/* Main Tabs for content */}
        <Tabs
          orientation={tabOrientation} // Horizontal on mobile, vertical on desktop
          variant="enclosed"
          colorScheme="teal"
          isFitted
          index={selectedTabIndex}
          onChange={(index) => setSelectedTabIndex(index)}
        >
          <TabPanels>
            <TabPanel>
              <AllPost />
            </TabPanel>

            <TabPanel>
              <Post />
            </TabPanel>

            <TabPanel>
              <PostUser />
            </TabPanel>

            <TabPanel>
              <FriendList />
            </TabPanel>

            <TabPanel>
              <SendRequest />
            </TabPanel>

            <TabPanel>
              <FriendRecommendation />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
}
