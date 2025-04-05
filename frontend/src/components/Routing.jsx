import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";  
import AnimeResults from "./animeresults.jsx"; 
import { Text } from "@chakra-ui/react";
import Trolleydisplay from "./Trolleydisplay";
import Header from "./Header/Header.jsx";
import AboutAni from "./aboutAni.jsx";

const Routing = () => {
  return (
    <>
    <Header />
    <Routes>
      <Route 
        path="/" 
        element={
          <>
            <Text 
              fontSize="4xl"  
              fontWeight="bold"  
              textAlign="center"  
              color="white"  
              mt="10vh"
              >
              Welcome to AniQuest
            </Text>
            <Trolleydisplay />
          </>
        }
        />
      <Route path="/search" element={<AnimeResults />} />
      <Route path="/about" element={<AboutAni />} />
    </Routes>
    </>
  );
};

export default Routing;
