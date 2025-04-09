import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AnimeResults from "./animeresults.jsx";
import { Text } from "@chakra-ui/react";
import Trolleydisplay from "./Trolleydisplay";
import Header from "./Header/Header.jsx";
import AboutAni from "./aboutAni.jsx";
import FavoriteAnime from "./FavoriteAnime"; 

const Routing = () => {
  const [favoriteAnime, setFavoriteAnime] = useState([]);

  const addFavorite = (anime) => {
    setFavoriteAnime((prevFavorites) => [...prevFavorites, anime]);
  };

  return (
    <>
      <Header />
      <Routes>
        <Route 
          path="/" 
          element={<Trolleydisplay />} 
        />
        <Route 
          path="/search" 
          element={<AnimeResults />} 
        />
        <Route 
          path="/about" 
          element={<AboutAni />} 
        />
        <Route 
          path="/favorites" 
          element={<FavoriteAnime favoriteAnime={favoriteAnime} />} 
        />
      </Routes>
    </>
  );
};

export default Routing;
