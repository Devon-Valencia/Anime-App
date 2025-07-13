import React, { useEffect, useState } from "react";

const FavoriteAnime = () => {
  const [favoriteAnime, setFavoriteAnime] = useState([]);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const savedProfileImage = localStorage.getItem("profileImage") || null;
    setFavoriteAnime(favorites);
    setProfileImage(savedProfileImage);
  }, []);

  const removeFromFavorites = (indexToRemove) => {
    const updatedFavorites = favoriteAnime.filter((_, index) => index !== indexToRemove);
    setFavoriteAnime(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <div style={{
        position: "absolute", width: "100%", height: "18%", top: "5rem", left: 0, zIndex: 1, overflow: "hidden"
      }}>
        <div style={{
          width: "100%", height: "150vh", backgroundImage: "url('/idkk.jpg')",
          backgroundSize: "cover", backgroundPosition: "center 540px",
          filter: "blur(10px)", transform: "scale(1.05)"
        }} />
      </div>

      <div style={{
        position: "absolute", top: "7.5vh", width: "100%", height: "15%",
        display: "flex", justifyContent: "center", alignItems: "center", zIndex: 10
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "12px", color: "white",
          fontSize: "28px", fontWeight: "600"
        }}>
          {profileImage ? (
            <img src={profileImage} alt="Profile" style={{
              width: "75px", height: "75px", borderRadius: "50%", objectFit: "cover",
            }} />
          ) : (
            <img src="blankpfp.jpg" alt="Profile" style={{
              width: "75px", height: "75px", borderRadius: "50%", objectFit: "cover",}}
              />
          )}
        </div>
      </div>

      <div style={{ paddingTop: "14%" }}>
        {favoriteAnime.length > 0 && (
          <h2 style={{
            textAlign: "center", fontSize: "40px", fontWeight: "500",
            color: "white", marginBottom: "20px", display: "flex",
            justifyContent: "center", alignItems: "center", gap: "8px"
          }}>
            <span style={{ color: "#E91E63" }}>♥</span>
            <span style={{ color: "#03a9fe" }}>Your</span>
            <span>Favorite</span>
            <span style={{ color: "#03a9fe" }}>Anime</span>
          </h2>
        )}

        <div style={{
          display: "flex", flexWrap: "wrap", gap: "16px",
          justifyContent: "center", padding: "10px 10px", zIndex: 10
        }}>
          {favoriteAnime.length > 0 ? (
            favoriteAnime.map((anime, index) => (
              anime && anime.image_url ? (
              <div key={index} style={{
                position: "relative",
                background: "#121212cc", 
                borderRadius: "10px",
                padding: "8px",
                width: "100%",
                maxWidth: "280px",
                height: "auto",
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
              }}>
                <img src={anime.image_url} alt={anime.title} style={{
                  width: "100%",
                  height: "360px", 
                  objectFit: "cover",
                  borderRadius: "6px"
                }} />
                  <h3 style={{ margin: "8px 0 4px", fontSize: "16px", fontWeight: "bold", color: "#fff" }}>
                    {anime.title.length > 30 ? `${anime.title.slice(0, 22)}...` : anime.title}
                  </h3>
                  <p style={{ fontSize: "13px", color: "#ccc" }}>⭐ {anime.score}</p>
                  <p style={{ fontSize: "13px", color: "#ccc" }}>📺 {anime.episodes || "?"} eps</p>
                  <p style={{ fontSize: "13px", color: "#ccc" }}>{anime.status || "Unknown"}</p>
                  <button
                    onClick={() => removeFromFavorites(index)}
                    style={{
                      position: "absolute", top: "12px", right: "12px",
                      background: "transparent", border: "none", color: "#ccc",
                      fontSize: "18px", cursor: "pointer",
                    }}
                    title="Remove from favorites"
                  >
                    ❌
                  </button>
                </div>
              ) : null 
            ))
          ) : (
            <p style={{ fontSize: "20px", color: "white", textAlign: "center", marginTop: "40px" }}>
              You have no favorite anime yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoriteAnime;
