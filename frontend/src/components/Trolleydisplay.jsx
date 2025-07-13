import { useEffect, useState, useRef } from "react";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/react-splide/css/skyblue';
import AnimePopup from "./AnimePopup";

const TROLLEY_FETCH_DELAY = 60000; // 60 seconds between fetches
let lastFetchTime = 0; // Track the last time the fetch was made

// Function to delay execution (using async/await)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const Trolleydisplay = () => {
  const [animeData, setAnimeData] = useState([]);
  const [secondAnimeData, setSecondAnimeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [secondTrolleyLoading, setSecondTrolleyLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const popupRef = useRef(null);

  const fetchData = async () => {
    const currentTime = Date.now();

    if (currentTime - lastFetchTime < TROLLEY_FETCH_DELAY) {
      console.log("Rate limit hit. Please wait.");
      return; // Skip fetch if rate limit is not met
    }

    setLoading(true);
    setSecondTrolleyLoading(true); // Reset second trolley loading state

    const randomPage1 = Math.floor(Math.random() * 10) + 1;
    const randomPage2 = Math.floor(Math.random() * 10) + 1;

    console.log(`Fetching anime from page ${randomPage1}...`);
    console.log(`Fetching anime from page ${randomPage2}...`);

    try {
      let res1 = await fetch(`http://127.0.0.1:5000/anime/random?page=${randomPage1}`);
      if (!res1.ok) {
        throw new Error(`Error fetching page ${randomPage1}`);
      }

      await delay(1000); // Delay between requests
      let res2 = await fetch(`http://127.0.0.1:5000/anime/random?page=${randomPage2}`);
      if (!res2.ok) {
        throw new Error(`Error fetching page ${randomPage2}`);
      }

      const data1 = await res1.json();
      const data2 = await res2.json();

      // Filter out non-TV anime
      const tvData1 = data1.filter(anime => anime.type === "TV");
      const tvData2 = data2.filter(anime => anime.type === "TV");

      // Set timeouts to control delays between loading trolleys
      setTimeout(() => {
        setAnimeData(tvData1); // Set data for first trolley
        setSecondAnimeData(tvData2); // Set data for second trolley
        setLoading(false);

        // Delay the second trolley longer
        setTimeout(() => {
          setSecondTrolleyLoading(false);
        }, 3000); // Delay second trolley by 3 seconds
      }, 3000); // Delay first trolley by 3 seconds

      // Update last fetch time
      lastFetchTime = Date.now();
    } catch (err) {
      // Handle errors like failed requests (without retry)
      setError(true);
      setLoading(false);
      console.error(err); // Log the error
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, TROLLEY_FETCH_DELAY); // Fetch every 60 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
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
        snap: true,
        pagination: false,
        arrows: false,
        pauseOnHover: true,
        autoScroll: { speed: 0.2 },
        breakpoints: {
          1628: { perPage: 6 },
          1485: { perPage: 5 },
          1117: { perPage: 4 },
          896: { perPage: 3 },
          768: { perPage: 2 },
        }
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

          {/* First Trolley */}
          <Box width="100%">
            {loading ? (
              <Box textAlign="center" mt={10}>
                <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.400" />
                <Text mt={2} color="white">Loading first trolley...</Text>
              </Box>
            ) : (
              renderTrolley(animeData)
            )}
          </Box>

          {/* Second Trolley */}
          <Box width="100%">
            {secondTrolleyLoading ? (
              <Box textAlign="center" mt={10}>
                <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.400" />
                <Text mt={2} color="white">Loading second trolley...</Text>
              </Box>
            ) : (
              renderTrolley(secondAnimeData)
            )}
          </Box>
        </Box>
      </Box>

      {selectedAnime && (
        <AnimePopup anime={selectedAnime} closePopup={() => setSelectedAnime(null)} popupRef={popupRef} />
      )}
    </>
  );
};

export default Trolleydisplay;
