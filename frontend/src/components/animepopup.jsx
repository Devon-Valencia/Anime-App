import { Box, Text } from "@chakra-ui/react";

const AnimePopup = ({ anime, closePopup, popupRef }) => {
  if (!anime) return null;  

const normalizedStatus = anime.status?.trim().toLowerCase();

const statusColor = normalizedStatus === "finished airing" ? "green.400"
                    : normalizedStatus === "currently airing" ? "blue.400"
                  : "gray.400";            
  return (
    <>

      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="rgba(0, 0, 0, 0.5)"  
        zIndex={999}  
        backdropFilter="blur(8px)"  
      />


      <Box
        ref={popupRef}
        position="fixed"
        top="50%"  
        left="50%" 
        transform="translate(-50%, -50%)" 
        bg="gray.800"
        color="white"
        px={4}
        py={3}
        borderRadius="8px"
        boxShadow="lg"
        zIndex={1000}
        minWidth="600px"
        minHeight="600px"
        textAlign="center"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        opacity={0.9}
      >

        <button
          onClick={closePopup}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'transparent',
            border: 'none',
            color: '#ffffff',
            fontSize: '24px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          ✖
        </button>

        <Box textAlign="center" >
                <img
                    src={anime.image_url}
                    alt={anime.title}
                    style={{
                    borderRadius: "20px",
                    width: '300px',
                    height: '375px',
                    display: 'block', 
                    margin: '0 auto', 
                    }}
                />
                </Box>
            <Box textAlign="center" flexDirection="column" marginTop="5px">
                <Text fontSize="lg" fontWeight="bold" 
                    style={{
                        display: 'block', 
                        margin: '0 auto', 
                }}>{anime.title}</Text>
                <Text fontSize="md"
                    style={{
                    margin: "0 auto",
                    color: "gold" 
                }}>⭐ Score: {anime.score}</Text>
                <Text fontSize="md"
                    style={{
                        margin: "0 auto",
                }}> 📺 Episodes: {anime.episodes || "Unknown"}</Text>
                <Text fontSize="lg"
                    color={statusColor}
                    style={{
                        marginLeft: '-250px',
                        margin: "0 auto",
                     }}>{anime.status || "Unknown"}</Text>
                    <Box 
                        marginTop="5px"
                        px={3} 
                        maxHeight="200px" 
                        maxWidth="600px"
                        overflowY="auto" 
                        textAlign="justify"
                        bg="gray.900"
                        p={4}
                        borderRadius="10px"
                        border="2px solid"
                        borderColor="#03a9fe"
                    >
                        <Text fontSize="md">
                        {anime.synopsis && anime.synopsis.trim() !== "" 
                            ? anime.synopsis 
                            : "No synopsis available."}
                        </Text>
                    </Box>
            </Box>
        </Box>
    </>
  );
};

export default AnimePopup;
