import { useEffect, useState, useRef } from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/react-splide/css/skyblue';
import AnimePopup from "./AnimePopup";

const SingleStar = () => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <span
      onClick={() => setIsClicked(!isClicked)}
      style={{
        position: "absolute", top: "-10px", right: "5px",
        fontSize: "35px", color: isClicked ? "yellow" : "grey",
        border: "5px", borderColor: isClicked ? "transparent" : "white",
        cursor: "pointer", transition: "color 0.2s ease-in-out",
      }}
      title={isClicked ? "Unfavorite" : "Favorite"}
    >
      ★
    </span>
  );
};

const Trolleydisplay = () => {
  const [animeData, setAnimeData] = useState([]);
  const [secondAnimeData, setSecondAnimeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const popupRef = useRef(null);

  const fetchData = () => {
    setLoading(true);
    const randomPage1 = Math.floor(Math.random() * 10) + 1;
    const randomPage2 = Math.floor(Math.random() * 10) + 1;

    Promise.all([
      fetch(`http://127.0.0.1:5000/anime/random?page=${randomPage1}`),
      fetch(`http://127.0.0.1:5000/anime/random?page=${randomPage2}`)
    ])
      .then(async ([res1, res2]) => {
        if (!res1.ok || !res2.ok) throw new Error("Failed to fetch");
        const data1 = await res1.json();
        const data2 = await res2.json();
        setAnimeData(data1);
        setSecondAnimeData(data2);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleAnimeClick = (anime, event) => {
    event.stopPropagation();
    setSelectedAnime(anime);
  };

  const handleOutsideClick = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setSelectedAnime(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const renderTrolley = (data) => (
    <Splide
      options={{
        type: "loop",
        drag: "free",
        focus: "center",
        gap: '1rem',
        perPage: 7,
        width: '100em',
        snap: true,
        pagination: false,
        arrows: false,
        pauseOnHover: true,
        autoScroll: { speed: 0.5 }
      }}
      extensions={{ AutoScroll }}
    >
      {loading && (
        <Box width="150px">
          <Spinner size="lg" />
          <Text color="white">Loading...</Text>
        </Box>
      )}
      {error && <Text color="red.500">Failed to load data</Text>}
      {data.map((anime, index) => (
        <SplideSlide key={index}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%" 
            minHeight="420px" 
            gap={2}
          >
            <Box position="relative" display="inline-block">
              <img
                src={anime.image_url}
                alt={`Anime ${index}`}
                style={{ width: '200px', height: '275px', cursor: 'pointer' }}
                onClick={(event) => handleAnimeClick(anime, event)}
              />
              <SingleStar />
            </Box>
            <Text fontWeight="bold" color="gray.300" textAlign="center">
              {anime.title.length > 30 ? `${anime.title.slice(0, 20)}...` : anime.title}
            </Text>
            <Text fontSize="sm" color="yellow.200">⭐ {anime.score}</Text>
            <Text color="white">{anime.type}</Text>
          </Box>
        </SplideSlide>
      ))}
    </Splide>
  );

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        py={6}
        gap={3}
        mt="12vh"
        px={6}
        width="100%"
      >
        <Text fontSize="3xl" fontWeight="bold" color="#03a9fe">
          Random Animes
        </Text>
  
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={10}
          width="100%"
          maxWidth="1600px"
        >
          <Box width="100%">
            {renderTrolley(animeData)}
          </Box>
  
          <Box width="100%">
            {renderTrolley(secondAnimeData)}
          </Box>
        </Box>
      </Box>
  
      {selectedAnime && (
        <AnimePopup anime={selectedAnime} closePopup={() => setSelectedAnime(null)} popupRef={popupRef} />
      )}
    </>
  );
}

export default Trolleydisplay;
