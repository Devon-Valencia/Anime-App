import React from 'react';
import { Box } from '@chakra-ui/react';
import { AniQuestHeader } from './AniQuestHeader';
import { Navbar } from './Navbar';
import Hamburgermenu from './Hamburgermenu';
import Profile from './profile';

const Header = () => {
  return (
    <Box bg="rgba(21, 34, 50, 0.6)" p={9} zIndex={100} 
    position="fixed" width="100%" top={0} left={0}  backdropFilter="blur(10px)">
        <Profile />
        <Hamburgermenu />
        <Navbar /> 
        <AniQuestHeader />
    </Box>
  );
};

export default Header;