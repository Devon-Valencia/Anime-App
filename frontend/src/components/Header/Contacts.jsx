import { Box, Text } from "@chakra-ui/react";

const Contacts = () => {
  return (
    <Box display="flex" flexDirection="row" alignItems="center" gap="1rem">
      <Text fontSize="lg" fontWeight="bold" color="gray.300">
        Contacts:
      </Text>
      {[
        {
          img: "linkedin.jpg",
          url: "https://www.linkedin.com/in/devon-valencia-54367b342/",
        },
        { img: "gmail.png", url: "mailto:devonval06@gmail.com" },
        { img: "X.jpg", url: "https://x.com/DevonValen67612" },
      ].map((item, idx) => (
        <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer">
          <Box
            w="40px"
            h="40px"
            borderRadius="full"
            cursor="pointer"
            transition="transform 0.2s ease"
            _hover={{ transform: "scale(1.15)" }}
          >
            <img
              src={item.img}
              alt={item.img.split(".")[0]}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </Box>
        </a>
      ))}
    </Box>
  );
};

export default Contacts;
