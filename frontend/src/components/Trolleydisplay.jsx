import { useEffect, useState, useRef } from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/react-splide/css/skyblue';
import AnimePopup from "./AnimePopup";

const Trolleydisplay = () => {
  const [animeData, setAnimeData] = useState([]);
  const [secondAnimeData, setSecondAnimeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [secondTrolleyLoading, setSecondTrolleyLoading] = useState(true); // New state for second trolley
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

        setTimeout(() => {
          setAnimeData(data1);
          setSecondAnimeData(data2);
          setLoading(false);

          // After the first trolley is loaded, delay the second trolley rendering
          setTimeout(() => {
            setSecondTrolleyLoading(false); // Now the second trolley can render
          }, 1000); // Wait for 1 second before rendering second trolley
        }, 1000);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
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
        autoScroll: { speed: 0.2 }
      }}
      extensions={{ AutoScroll }}
    >
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
            </Box>
            <Text fontWeight="bold" color="white" textAlign="center" fontSize="lg">
              {anime.title.length > 20 ? `${anime.title.slice(0, 20)}...` : anime.title}
            </Text>
            <Text fontSize="md" fontWeight={"bold"} color="yellow.200">⭐ {anime.score}</Text>
            <Text color="gray.300" fontWeight={"bold"} fontSize="md">{anime.type}</Text>
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
        mt="16vh"
        px={6}
        width="100%"
      >
        <Box
          position="relative"
          width="100%"
          maxWidth="1600px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={10}
        >
          <Text
            position="absolute"
            top="-40px"
            left="0px"
            fontSize="3xl"
            fontWeight="bold"
            color="#03a9fe"
            zIndex="1"
          >
            <span style={{ color: 'white' }}>Scroll &</span> Explore
          </Text>

          {loading ? (
            <Box textAlign="center" mt={10}>
              <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.400" />
              <Text mt={2} color="white">Refreshing anime list...</Text>
            </Box>
          ) : (
            <>
              <Box width="100%">
                {renderTrolley(animeData)}
              </Box>

              {/* Only render the second trolley once it's not loading anymore */}
              {secondTrolleyLoading ? (
                <Box textAlign="center" mt={10}>
                  <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.400" />
                  <Text mt={2} color="white">Loading second trolley...</Text>
                </Box>
              ) : (
                <Box width="100%">
                  {renderTrolley(secondAnimeData)}
                </Box>
              )}
            </>
          )}
        </Box>
      </Box>

      {selectedAnime && (
        <AnimePopup anime={selectedAnime} closePopup={() => setSelectedAnime(null)} popupRef={popupRef} />
      )}
    </>
  );
};

export default Trolleydisplay;
