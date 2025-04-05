import { Container, Flex, Image, Text, Button } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AnimePopup from "./AnimePopup"; // Import AnimePopup

const fetchGenres = async () => {
  const response = await fetch("https://api.jikan.moe/v4/genres/anime");
  const data = await response.json();
  return data.data;
};

const fetchAnimeResults = async ({ queryKey }) => {
  const [, query, filterBy, genreList, page] = queryKey;
  if (!query) return [];

  const formattedQuery = query.toLowerCase();
  let apiUrl = `https://api.jikan.moe/v4/anime?q=${formattedQuery}&order_by=score&sort=desc&page=${page}`;

  if (filterBy === "genre") {
    const genre = genreList?.find((g) => g.name.toLowerCase() === formattedQuery);
    if (!genre) throw new Error(`Genre "${query}" not found.`);
    apiUrl = `https://api.jikan.moe/v4/anime?genres=${genre.mal_id}&order_by=score&sort=desc&page=${page}`;
  } else if (filterBy === "type") {
    const validTypes = ["tv", "movie", "ova", "special", "ona", "music"];
    if (!validTypes.includes(formattedQuery)) {
      throw new Error(`Invalid type "${query}". Valid types: ${validTypes.join(", ")}`);
    }
    apiUrl = `https://api.jikan.moe/v4/anime?type=${formattedQuery}&order_by=score&sort=desc&page=${page}`;
  }

  console.log("Fetching data from API:", apiUrl);
  const response = await fetch(apiUrl);
  const data = await response.json();

  if (!data.data || data.data.length === 0) {
    throw new Error("No results found.");
  }

  return {
    results: data.data.map((anime, index) => ({
      unique_id: `${anime.mal_id}-${index}`,
      mal_id: anime.mal_id,
      title: anime.title,
      english_title: anime.titles.find((title) => title.type === "English")?.title || anime.title,
      image_url: anime.images?.jpg?.image_url,
      score: anime.score || "N/A",
      episodes: anime.episodes || "Unknown",
      status: anime.status || "Unknown",
      synopsis: anime.synopsis || "No synopsis available.",
      type: anime.type,
    })),
    totalPages: data.pagination?.last_visible_page || 1,
  };
};

export const AnimeResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("keyword");
  const filterBy = queryParams.get("filter") || "name";
  const [page, setPage] = useState(1);
  const [selectedAnime, setSelectedAnime] = useState(null);

  const { data: genreList = [] } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["anime", query, filterBy, genreList, page],
    queryFn: fetchAnimeResults,
    enabled: !!query,
  });

  return (
    <Container maxW="1400px" my={4} pt={20}>
      {!query ? (
        <Text textAlign="center">Welcome to AniQuest! Search for your favorite anime above.</Text>
      ) : (
        <>
          {isLoading && <Text textAlign="center">Loading...</Text>}
          {error && <Text textAlign="center" color="red.500">{error.message}</Text>}
          {!isLoading && !error && data?.results.length === 0 && (
            <Text textAlign="center">No results found for "{query}"</Text>
          )}
          <Flex wrap="wrap" gap={2} justify="center" mt={4}>
            {data?.results.map((anime) => (
              <Flex
                key={anime.unique_id}
                direction="column"
                align="center"
                w="250px"
                minH="400px"
                p={3}
                borderRadius="20px"
                boxShadow="md"
                border="2px solid"
                borderColor="gray.700"
                cursor="pointer"
                onClick={() => setSelectedAnime(anime)} // Open popup when clicked
                _hover={{ bg: "gray.700" }}
              >
                <Image
                  src={anime.image_url}
                  alt={anime.english_title}
                  boxSize="250px"
                  objectFit="cover"
                  borderRadius="10px"
                />
                <Text fontSize="lg" textAlign="center" mt={2} color="blue.400">
                  {anime.english_title}
                </Text>
                <Text fontSize="md" color="white" mt={1}>
                  ⭐ {anime.score}
                </Text>
                <Text fontSize="md" color="white">
                  {anime.type}
                </Text>
              </Flex>
            ))}
          </Flex>

          {data?.results.length > 0 && (
            <Flex justify="center" mt={6} gap={4}>
              <Button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} isDisabled={page === 1}>
                Previous
              </Button>
              <Text fontSize="md">Page {page} of {data.totalPages}</Text>
              <Button onClick={() => setPage((prev) => (prev < data.totalPages ? prev + 1 : prev))} isDisabled={page >= data.totalPages}>
                Next
              </Button>
            </Flex>
          )}

          
          {selectedAnime && (
            <AnimePopup 
              anime={selectedAnime} 
              closePopup={() => setSelectedAnime(null)}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default AnimeResults;
