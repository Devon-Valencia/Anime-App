import React, { useState, useEffect } from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import LoginPopup from '../LoginPopup';

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  const openLoginPopup = () => setIsOpen(true);
  const closeLoginPopup = () => setIsOpen(false);

  const handleLogin = (name) => {
    if (name) {
      setUsername(name);
      setIsLoggedIn(true);
      localStorage.setItem("username", name);
      closeLoginPopup();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername('');
    setIsLoggedIn(false);
    setIsMenuOpen(false);
  };

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {!isLoggedIn && (
        <Box position="absolute" top="1rem" right="1rem">
          <Button onClick={openLoginPopup} colorScheme="blue" size="sm">
            Login
          </Button>
        </Box>
      )}

      {isLoggedIn && (
        <Box display="flex" justifyContent="flex-end">
          <img
            src="/jinwoo.jpg"
            alt="Profile"
            onClick={openMenu}
            onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
            onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
            style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '50%', cursor: 'pointer', transition: 'transform 0.3s ease', position: 'absolute', top: '1rem', right: '1rem' }}
          />
        </Box>
      )}

      {isMenuOpen && (
        <div onClick={closeMenu} style={{ position: 'fixed', top: '3rem', right: '-48.4rem', zIndex: 1000, width: '100%', height: '100vh' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: '#1A1A1B', padding: '2rem', position: 'relative', width: '250px', textAlign: 'center', margin: '0 auto', top: '0%', height: 'auto' }}>
            <button onClick={closeMenu} style={{ position: 'absolute', top: '10px', right: '15px', background: 'transparent', border: 'none', fontSize: '20px', cursor: 'pointer' }}>×</button>

            <Text fontWeight="bold" fontSize="18px" fontFamily="Montserrat" justifyContent="flex-start" alignItems="left">
              <span style={{ color: '#03a9fe' }}>{username || "Guest"}</span>
            </Text>

            <br />
            
            <Button variant="ghost" width="100%" fontWeight="bold" fontSize="14px" fontFamily="Montserrat" justifyContent="flex-start" textAlign="left" onClick={() => setIsMenuOpen(false)}>
              Account Settings
            </Button>

            <br />

            <Button variant="ghost" width="100%" fontWeight="bold" fontSize="14px" fontFamily="Montserrat" justifyContent="flex-start" onClick={() => { navigate("/favorites"); setIsMenuOpen(false); }}>
              Favorites
            </Button>

            <br />

            <Button colorScheme="red" variant="outline" width="100%" mt={4} fontWeight="bold" fontSize="14px" fontFamily="Montserrat" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      )}

      <LoginPopup isOpen={isOpen} onClose={closeLoginPopup} onLogin={handleLogin} />
    </>
  );
};

export default Profile;
