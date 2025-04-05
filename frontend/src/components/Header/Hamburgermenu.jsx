import React, { useState } from 'react';
import { Squash as Hamburger } from 'hamburger-react';
import { Box, Button, VStack} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

function Hamburgermenu() {
    const [isOpen, setOpen] = useState(false);
    const navigate = useNavigate();
  return (
    <>
      <div>
        <Box position="fixed" top='-.5%' left="1%" p={3}>
            <Hamburger size={30} duration={0} toggled={isOpen} toggle={setOpen} />

            {isOpen && (
                <Box
                    position="fixed"
                    top="0"
                    left="0"
                    width="100vw"
                    height="100vh"
                    bg="rgba(0, 0, 0, 0.2)" 
                    backdropFilter="blur(4px)"
                    zIndex="9"
                    onClick={() => setOpen(false)} 
                />
            )}

            {isOpen && (
                <VStack
                position="fixed"
                left="-10px"
                top="0px"
                bg="rgba(128, 128, 128, 0.2)" 
                backdropFilter="blur(10px)"
                p={4}
                boxShadow="lg"
                width="300px"
                height="100vh"
                zIndex="10"
                >
                <Button variant="ghost" width="100%" onClick={() => setOpen(false)}
                    fontSize={'14px'} fontFamily='Montserrat' display="flex" justifyContent="flex-start">{"<"}&nbsp;&nbsp;&nbsp;Close menu</Button>
                    <Button variant="ghost" width="100%" fontWeight="bold" onClick={() => {
                        navigate("/"); setOpen(false); }} fontSize="14px"fontFamily="Montserrat" display="flex"
                        top="5vh" justifyContent="flex-start" _focus={{ boxShadow: "none" }} _hover={{ textDecoration: "none" }}>Home
                    </Button>
                <Button variant="ghost" width="100%" fontWeight={'bold'} onClick={() => {
                        navigate("/about"); setOpen(false); }} fontSize={'14px'} fontFamily='Montserrat' display="flex" top="5vh" justifyContent="flex-start">About</Button>
                <Button variant="ghost" width="100%" fontWeight={'bold'} onClick={() => setOpen(false)}
                    fontSize={'14px'} fontFamily='Montserrat' display="flex" top="5vh" justifyContent="flex-start">Contact</Button>
            </VStack>
            )}
        </Box>
    </div>
</>
  );
}


export default Hamburgermenu;