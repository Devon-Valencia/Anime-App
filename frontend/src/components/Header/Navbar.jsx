import React, { useState } from "react";
import { Box, Button, Flex, Input, VStack, Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import genreList from "./genreList";

const typeList = [
  "TV", "OVA", "Movie", "Special", "Music", "Manga", "Novel", "One Shot"
];

export const Navbar = () => {
  const [query, setQuery] = useState("");
  const [filterBy, setFilterBy] = useState("name");
  const [isOpen, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchAnimeSuggestions = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?q=${searchTerm}&limit=5`
      );
      const data = await response.json();
      setSuggestions(data.data || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
    setIsLoading(false);
  };

  const fetchGenreSuggestions = (searchTerm) => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    const filteredGenres = genreList.filter((genre) =>
      genre.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSuggestions(filteredGenres);
  };

  const fetchTypeSuggestions = (searchTerm) => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    const filteredTypes = typeList.filter((type) =>
      type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSuggestions(filteredTypes);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (filterBy === "genre") {
      fetchGenreSuggestions(value);
    } else if (filterBy === "type") {
      fetchTypeSuggestions(value);
    } else {
      fetchAnimeSuggestions(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      e.preventDefault();
      navigate(`/search?keyword=${query}&filter=${filterBy}`);
      setSuggestions([]);
    }
  };

  return (
    <Box>
      <Flex direction="column" align="center" position="relative">
        <Input
          placeholder={`Search anime by ${filterBy}...`}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          width="100%"
          borderRadius={0}
          backgroundColor="white"
          border={"none"}
          color="black"
          p={3}
          _placeholder={{
            color: "gray.500",
            fontFamily: "Montserrat",
            fontSize: "14px",
          }}
        />
        {isLoading && (
          <Box position="absolute" top="110%" left="10px" zIndex="20">
            <Spinner size="sm" color="gray.600" />
          </Box>
        )}
        {suggestions.length > 0 && (
          <Box
            position="absolute"
            top="110%"
            width="100%"
            bg="rgba(22, 25, 29, 0.93)" 
            boxShadow="md"
            borderRadius="md"
            zIndex="20"
            mt={1}
            maxHeight="200px"
            overflowY="auto"
          >
            {suggestions.map((item) => (
              <Box
                key={item.mal_id || item.name || item}
                px={4}
                py={2}
                _hover={{
                  backgroundColor: "rgba(21, 34, 50, 0.6)",
                  cursor: "pointer",
                }}
                onClick={() => {
                  const searchQuery = item.title || item.name || item;
                  navigate(`/search?keyword=${searchQuery}&filter=${filterBy}`);
                  setSuggestions([]);
                }}
              >
                {item.title || item.name || item}
              </Box>
            ))}
          </Box>
        )}
      </Flex>

      <Box position="absolute" top="50%" right="1" transform="translateY(-50%)">
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
            left="40px"
            top="20px"
            bg="rgba(27, 26, 26, 0.7)"
            backdropFilter="blur(10px)"
            p={4}
            boxShadow="lg"
            borderRadius="4px"
            width="120px"
            zIndex="10"
            spacing={3}
          >
            {["name", "genre", "type"].map((filter) => (
              <Button
                key={filter}
                variant="ghost"
                size="sm"
                onClick={() => {
                  setFilterBy(filter);
                  setOpen(false);
                  setQuery("");
                  setSuggestions([]);
                }}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Button>
            ))}
          </VStack>
        )}
      </Box>
    </Box>
  );
};
