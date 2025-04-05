import React, { useState } from "react";
import { Box, Button, Flex, Input, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [query, setQuery] = useState("");
  const [filterBy, setFilterBy] = useState("name");
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (query.trim()) {
        navigate(`/search?keyword=${query}&filter=${filterBy}`);
      }
    }
  };

  return (
    <Box position="fixed" top=".5%" left="26.7%" p={3}>
      <Flex align="left">
        <Input
          placeholder={`Search anime ${filterBy}...`}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          width="420px"
          backgroundColor="white"
          color="black"
          p={2}
          borderRadius={0}
          _placeholder={{ color: "gray.500", fontFamily: "Montserrat", fontSize: "14px" }}
        />
      </Flex>

      <Box position="absolute" top="50.5%" left="90%" transform="translate(-50%, -50%)">
        <Button
          variant="subtle"
          size="xs"
          borderRadius="5px"
          _hover={{ color: "gray" }}
          onClick={() => setOpen(!isOpen)}
        >
          Filter
        </Button>

        {isOpen && (
          <VStack
            position="absolute"
            left="57px"
            top="-5px"
            bg="rgba(128, 128, 128, 0.2)"
            backdropFilter="blur(10px)"
            p={4}
            boxShadow="lg"
            borderRadius="4px"
            width="80px"
            zIndex="10"
          >
            <Button variant="ghost" size="sm" onClick={() => { setFilterBy("name"); setOpen(false); }}>
              Name
            </Button>
            <Button variant="ghost" size="sm" onClick={() => { setFilterBy("genre"); setOpen(false); }}>
              Genre
            </Button>
            <Button variant="ghost" size="sm" onClick={() => { setFilterBy("type"); setOpen(false); }}>
              Type
            </Button>
          </VStack>
        )}
      </Box>
    </Box>
  );
};
