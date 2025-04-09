import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";

const SingleStar = ({ anime, addFavorite }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleStarClick = () => {
    setIsClicked(!isClicked);
    addFavorite(anime, !isClicked);
  };

  return (
    <Box
      as="span"
      onClick={handleStarClick}
      position="absolute"
      top="-10px"
      right="5px"
      fontSize="45px"
      color={isClicked ? "yellow" : "white"}
      cursor="pointer"
      transition="color 0.2s ease-in-out"
      title={isClicked ? "Unfavorite" : "Favorite"}
      textShadow="0 0 1px black, 1px 1px 1px black, -1px -1px 1px black"
      _hover={{
        transform: "scale(1.2)",}}
    >
      ★
    </Box>
  );
};

const AnimePopup = ({ anime, closePopup, popupRef }) => {
  const [favoriteAnime, setFavoriteAnime] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteAnime(favorites);
  }, []);

  const addFavorite = (anime, isFavorite) => {
    const updatedFavorites = isFavorite
      ? [...favoriteAnime, anime]
      : favoriteAnime.filter((fav) => fav.mal_id !== anime.mal_id);

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavoriteAnime(updatedFavorites);
  };

  if (!anime) return null;

  const statusColor = anime.status?.toLowerCase().trim() === "finished airing" 
    ? "green.400" 
    : anime.status?.toLowerCase().trim() === "currently airing"
    ? "blue.400"
    : "gray.400";

  return (
    <>
      <Box
        position="fixed" top="0" left="0" right="0" bottom="0" 
        bg="rgba(0, 0, 0, 0.5)" zIndex={999} backdropFilter="blur(8px)"
      />
      <Box
        ref={popupRef}
        position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)" bg="gray.800"
        color="white" px={4} py={3} borderRadius="8px" boxShadow="lg" zIndex={1000}
        minWidth="650px" minHeight="800px" textAlign="center"
        display="flex" flexDirection="column" justifyContent="center" alignItems="center" opacity={0.95}
      >
        <button
          onClick={closePopup}
          style={{
            position: "absolute", top: "10px", right: "10px", background: "transparent",
            border: "none", color: "#ffffff", fontSize: "24px", fontWeight: "bold", cursor: "pointer",
          }}
        >
          ×
        </button>

        <Box position="relative" display="inline-block">
          <img
            src={anime.image_url}
            alt={anime.title}
            style={{ borderRadius: "20px", width: "300px", height: "375px", display: "block", margin: "0 auto" }}
          />
          <SingleStar anime={anime} addFavorite={addFavorite} />
        </Box>

        <Box textAlign="center" marginTop="10px" marginBottom="10px" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif">
          <Text fontSize="lg" fontWeight="bold">{anime.title}</Text>
          <Text fontSize="lg"  fontWeight="bold" color="gold" >⭐ Score: {anime.score}</Text>
          <Text fontSize="lg" fontWeight="bold" >📺 Episodes: {anime.episodes || "Unknown"}</Text>
          <Text fontSize="lg" fontWeight="bold" color={statusColor}>{anime.status || "Unknown"}</Text>

          <Box marginTop="25px" px={3} maxHeight="200px" maxWidth="600px" overflowY="auto"
            textAlign="justify" bg="gray.900" p={4} borderRadius="10px" border="2px solid" borderColor="#03a9fe"
          >
            <Text fontSize="md">
              {anime.synopsis && anime.synopsis.trim() !== "" 
                ? anime.synopsis 
                : "No synopsis available."
              }
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AnimePopup;
