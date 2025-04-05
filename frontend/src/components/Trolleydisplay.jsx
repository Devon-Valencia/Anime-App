import { useEffect, useState, useRef } from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/react-splide/css/skyblue';
import '/index.css';
import AnimePopup from "./AnimePopup";

const Trolleydisplay = () => {
  const [animeData, setAnimeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const popupRef = useRef(null);

  const generateRandomPage = () => Math.floor(Math.random() * 10) + 1;

  const fetchData = () => {
    setLoading(true);
    const randomPage = generateRandomPage();

    setTimeout(() => {
      fetch(`http://127.0.0.1:5000/anime/random?page=${randomPage}`)
        .then((res) => res.ok ? res.json() : Promise.reject("Failed to fetch data"))
        .then((data) => setAnimeData(data.length > 0 ? data : []))
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }, 2000);
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => fetchData(), 15000);
    return () => clearInterval(intervalId);
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

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
        <div style={{
          display: "flex", justifyContent: "center", alignItems: "center", height: "45vh",
          width: "140vh", backgroundColor: "rgba(128, 128, 128, 0.5)", borderRadius: "20px", border: "3px solid #03a9fe"
        }}>
          <Splide
            options={{
              type: "loop",
              drag: "free",
              focus: "center",
              gap: '1rem',
              perPage: 5,
              width: '70em',
              snap: true,
              pagination: false,
              arrows: false,
              pauseOnHover: true,
              pauseOnFocus: false,
              waitForTransition: false,
              autoScroll: { speed: .5 },
            }}
            extensions={{ AutoScroll }}
          >
            <Box>
              {loading && (
                <Box>
                  <Spinner size="xl" />
                  <Text color="gray.500">Loading...</Text>
                </Box>
              )}
              {error && <Text color="red.500">Failed to load data</Text>}
            </Box>
            {animeData.map((anime, index) => (
              <SplideSlide key={index}>
                <Box position="relative" display="inline-block">
                  <img
                    src={anime.image_url}
                    alt={`Anime ${index}`}
                    style={{ width: '200px', height: '275px', cursor: 'pointer' }}
                    onClick={(event) => handleAnimeClick(anime, event)}
                  />
                </Box>
                <Text fontWeight='bold' color='gray.300'>{anime.title}</Text>
                <Text fontSize="sm" color="yellow.200">⭐ {anime.score}</Text>
                <Text>{anime.type}</Text>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>

      {selectedAnime && (
        <AnimePopup
          anime={selectedAnime}
          closePopup={() => setSelectedAnime(null)}
          popupRef={popupRef}
        />
      )}
    </>
  );
};

export default Trolleydisplay;
