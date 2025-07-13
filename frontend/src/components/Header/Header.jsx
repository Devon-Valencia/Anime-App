import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import AniQuestHeader from "./AniQuestHeader";
import { Navbar } from "./Navbar";
import Hamburgermenu from "./Hamburgermenu";
import Profile from "./Profile";
import Contacts from "./Contacts";
import "./Header.css"; 

const Header = () => {
  return (
    <Box className="header">
      <Box className="header-container">
        <Flex className="header-flex">

          <Box className="header-aniquest">
            <AniQuestHeader />
          </Box>


          <Box className="header-navbar">
            <Navbar />
          </Box>
        </Flex>


        <Box className="header-profile">
          <Profile />
        </Box>

 
        <Box className="header-contacts">
          <Contacts />
        </Box>


        <Box className="header-hamburger">
          <Hamburgermenu />
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
