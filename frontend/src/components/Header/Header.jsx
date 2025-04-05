import React from 'react';
import { Box } from '@chakra-ui/react';
import { AniQuestHeader } from './AniQuestHeader';
import { Navbar } from './Navbar';
import Hamburgermenu from './Hamburgermenu';

const Header = () => {
  return (
    <Box bg="#152232" p={9} zIndex={100} position="fixed" width="100%" top={0} left={0}>
        <Hamburgermenu />
        <Navbar/> 
        <AniQuestHeader/>
    </Box>
  );
};

export default Header;