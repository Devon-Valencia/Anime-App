import React from "react";
import { Box, Text } from "@chakra-ui/react";

const textStyle = {
  content: '""',
  position: 'absolute',
  bottom: 0,
  left: '50%',
  width: '0%',
  height: '2px',
  backgroundColor: '#03a9fe',
  transition: 'width .7s ease, left .7s ease',
};

const AboutAni = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      paddingTop="100px"
      minHeight="100vh"
      bg="gray.800"
    >
      <Text
        fontSize="5xl"
        fontWeight="bold"
        color="white"
        bgGradient="linear(to-r, #03a9fe, #ff4081)"
        _hover={{
          transform: "scale(1.1)",
          textShadow: "2px 2px 5px rgba(255, 255, 255, 0.5)"
        }}
        transition="all 0.3s ease-in-out"
      >
        About{" "}
        <span style={{ color: '#03a9fe' }}>Ani</span>
        <span style={{ color: 'white' }}>Quest</span>
      </Text>

      <Box width="130vh" height="50vh" padding={10} bg="gray.900" border="solid black 2px" borderRadius="5px" mt={10} 
        transition= "all 0.6s ease-in-out" 
        _hover={{ transform: "scale(1.1)", color: "#03a9fe",}}
        style={{ resize: "both", overflow: "auto", 
        }}
      >
        <Text fontSize="2xl" style={{ textIndent: '50px', lineHeight: '1.7', color: 'white'}}>
          <span style={{ color: '#03a9fe' }}>Ani</span>Quest is your go-to platform for discovering, exploring, and keeping track of your favorite anime. Whether you're a long-time fan or just starting your anime journey, AniQuest makes it easy to search, find, and enjoy anime tailored to your preferences.
          With <span style={{ color: '#03a9fe' }}>Ani</span>Quest, you can Search for Anime: Use our powerful search tool to find detailed information about your favorite anime titles, from plot summaries to episode counts and more.
          Personalized Experience: Create a profile and stay logged in to keep track of your anime adventures. No need to worry about losing your progress – it’s all saved for you!
          Discover New Shows: Explore new and trending anime based on your interests, and stay updated on the latest anime releases.
          Get started with AniQuest today and dive into the world of anime like never before!
        </Text>
      </Box>
    </Box>
  );
};

export default AboutAni;
