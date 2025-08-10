import React, { useState } from 'react';
import { Squash as Hamburger } from 'hamburger-react';
import { Box, Button, VStack } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

function Hamburgermenu() {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Box position="absolute" top="1rem" left="1rem" zIndex={100}>
      <Hamburger size={30} toggled={isOpen} toggle={setOpen} />
      
      {isOpen && (
        <>

          <Box
            position="fixed" top="0" left="0" width="100vw" height="100vh" bg="rgba(0, 0, 0, 0.5)"
            backdropFilter="blur(4px)" zIndex="9" onClick={() => setOpen(false)}
          />
          

          <VStack
            position="fixed" left="-10px" top="0" bg="rgba(22, 25, 29, 0.93)"  backdropFilter="blur(10px)"
            p={4} boxShadow="lg" width="300px" height="100vh" zIndex="10"
          >

            <Button
              variant="ghost" width="100%" onClick={() => setOpen(false)} fontWeight="bold" fontSize={'16px'}
              fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif" _hover={{ bg: 'rgba(57, 56, 56, 0.6)' }}
            >
              {"<"}&nbsp;<span style={{ color: '#03a9fe' }}>Close</span> menu
            </Button>


            <Button
              variant="ghost" width="100%" fontWeight="bold" onClick={() => { navigate("/"); setOpen(false); }}
              fontSize="15px" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif" _hover={{ bg: 'rgba(57, 56, 56, 0.6)' }}
            >
              Home
            </Button>
            <Button
              variant="ghost" width="100%" fontWeight={'bold'} onClick={() => { navigate("/about"); setOpen(false); }}
              fontSize={'15px'} fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif" _hover={{ bg: 'rgba(57, 56, 56, 0.6)' }}
            >
              About
            </Button>
            <Button
              variant="ghost" width="100%" fontWeight={'bold'} onClick={() => { navigate("/favorites"); setOpen(false); }}
              fontSize={'15px'} fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif" _hover={{ bg: 'rgba(57, 56, 56, 0.6)' }}
            >
              Favorites
            </Button>
          </VStack>
        </>
      )}
    </Box>
  );
}

export default Hamburgermenu;
