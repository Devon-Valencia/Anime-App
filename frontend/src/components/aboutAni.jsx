import React from "react";
import { Box, Text } from "@chakra-ui/react";

const AboutAni = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      paddingTop="100px"
      height="10vh"
    >
      <Text fontSize="4xl" fontWeight="bold">
      About{" "}
      <span style={{color: '#03a9fe'}}>Ani</span>
      <span style={{color: 'white'}}>Quest</span>
      </Text>
      <Box width="130vh" padding={10}>
        <Text fontSize="2xl" style={{ textIndent: '50px', lineHeight: '1.6', textAlign: 'center' }}>  AniQuest is your go-to platform for discovering, exploring, and keeping track of your favorite anime. Whether you're a long-time fan or just starting your anime journey, AniQuest makes it easy to search, find, and enjoy anime tailored to your preferences.
              With AniQuest, you can Search for Anime: Use our powerful search tool to find detailed information about your favorite anime titles, from plot summaries to episode counts and more.
              Personalized Experience: Create a profile and stay logged in to keep track of your anime adventures. No need to worry about losing your progress – it’s all saved for you!
              Discover New Shows: Explore new and trending anime based on your interests, and stay updated on the latest anime releases.
              Get started with AniQuest today and dive into the world of anime like never before!
        </Text>
      </Box>
    </Box>
  );
};

export default AboutAni;

