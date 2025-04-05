import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";

export const AniQuestHeader = () => {
  return (
    <Box position="fixed" top="-10px" left="15%" transform="translateX(10%)"   width="fit-content" minWidth="200px"   p={3}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Text
            fontSize="40px"
            fontWeight="bold"
            cursor="pointer"
            _hover={{ color: "white" }}
            textAlign='center'
          >
            <span style={{color: '#03a9fe'}}>Ani</span>
            <span style={{color: 'white'}}>Quest</span>
          </Text>
        </Link>
    </Box>
  );
};
