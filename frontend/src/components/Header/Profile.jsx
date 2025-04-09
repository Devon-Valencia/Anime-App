import React, { useState, useEffect } from 'react';
import { Box, Button, Text, Input, Icon } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const img = localStorage.getItem("profileImage");
    if (img) {
      setProfileImage(img);
      setIsLoggedIn(true);
    }
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file?.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        localStorage.setItem("profileImage", base64);
        setProfileImage(base64);
        setIsLoggedIn(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const logout = () => {
    localStorage.removeItem("profileImage");
    setProfileImage(null);
    setIsLoggedIn(false);
    setIsMenuOpen(false);
  };

  const imgStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
    cursor: 'pointer',
    transition: '0.3s',
    transform: 'scale(1)',
  };

  const buttonStyle = {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: '0%',
    height: '2px',
    backgroundColor: '#03a9fe',
    transition: 'width .7s ease, left .7s ease',
  };

  return (
    <>
      {!isLoggedIn ? (
        <Box pos="absolute" top="1rem" right="1rem">
          <label htmlFor="upload">
            <Box w="40px" h="40px" borderRadius="full" cursor="pointer" transition="transform 0.2s ease" _hover={{ transform: 'scale(1.15)'}}>
              <img src="blankpfp.jpg" alt="Upload" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            </Box>
          </label>
          <Input id="upload" type="file" accept="image/*" display="none" onChange={handleImageUpload} />
        </Box>
      ) : (
        <Box pos="absolute" top=".9rem" right="1.5rem">
          <img
            src={profileImage}
            alt="Profile"
            onClick={() => setIsMenuOpen(true)}
            style={imgStyle}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
        </Box>
      )}

      {isMenuOpen && (
        <Box pos="fixed" top="3rem" right="0" w="100%" h="100vh" zIndex="1000" onClick={() => setIsMenuOpen(false)}>
          <Box bg="#1A1A1B" w="250px" p="1.5rem" pos="absolute" right="1rem" borderRadius="md" onClick={(e) => e.stopPropagation()}>
            <Button pos="absolute" top="10px" right="10px" variant="unstyled" fontSize="20px" onClick={() => setIsMenuOpen(false)}>×</Button>

            <Text fontWeight="bold" fontSize="lg" color="#03a9fe" mb={4} textAlign="center">Welcome</Text>

            <Button
              variant="ghost"
              w="100%"
              fontSize="sm"
              justifyContent="flex-start"
              onClick={() => setIsMenuOpen(false)}
              _after={{ ...buttonStyle, width: '0%' }}
              _hover={{ _after: { ...buttonStyle, width: '100%', left: '0%' } }}
            >
              Account Settings
            </Button>

            <Button
              variant="ghost"
              w="100%"
              mt={2}
              fontSize="sm"
              justifyContent="flex-start"
              onClick={() => { navigate("/favorites"); setIsMenuOpen(false); }}
              _after={{ ...buttonStyle, width: '0%' }}
              _hover={{ _after: { ...buttonStyle, width: '100%', left: '0%' } }}
            >
              Favorites
            </Button>

            <Button
              colorScheme="red"
              variant="outline"
              w="100%"
              mt={4}
              fontSize="sm"
              onClick={logout}
              border="none"
              justifyContent="flex-start"
              _after={{ ...buttonStyle, width: '0%' }}
              _hover={{ backgroundColor: 'transparent', _after: { ...buttonStyle, width: '100%', left: '0%' } }}
            >
              Logout
              <Icon as={FaArrowRight} ml="1vh" />
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Profile;
