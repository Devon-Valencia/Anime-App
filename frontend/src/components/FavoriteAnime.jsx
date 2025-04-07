import React, { useEffect, useState } from "react";

const FavoriteAnime = () => {
  const [favoriteAnime, setFavoriteAnime] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const savedUsername = localStorage.getItem("username") || "";
    setFavoriteAnime(favorites);
    setUsername(savedUsername);
  }, []);

  const removeFromFavorites = (indexToRemove) => {
    const updatedFavorites = favoriteAnime.filter((_, index) => index !== indexToRemove);
    setFavoriteAnime(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      {/* Background Blur Banner */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "10%",
          top: "7.5vh",  // Keep the banner at the top
          left: "0",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: "url('/idkk.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 540px",
            filter: "blur(10px)",
            transform: "scale(1.05)",
          }}
        ></div>
      </div>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "10%",
          top: "7.5vh",
          left: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <h1
          style={{
            fontSize: "35px",
            marginBottom: "15px",
            color: "white",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
            fontWeight: "600",
          }}
        >
          <span style={{ color: "#03a9fe" }}>Hi,</span>
          <span> {username || "Guest"} </span>
        </h1>
      </div>

      <div style={{ paddingTop: "20%" }}>
        {favoriteAnime.length > 0 && (
          <h2
            style={{
              position: "absolute",
              top: "280px",
              left: "300px",
              transform: "translateX(-50%)",
              fontSize: "35px",
              fontWeight: "500",
              padding: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span style={{ color: "#E91E63" }}>♥</span>
            <span style={{ color: "#03a9fe" }}>Your </span>
            <span>Favorite </span>
            <span style={{ color: "#03a9fe" }}>Anime</span>
          </h2>
        )}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
            padding: "0 10px",
            width: "1750px",
            zIndex: "10",
          }}
        >
          {favoriteAnime.length > 0 ? (
            favoriteAnime.map((anime, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "16px",
                  padding: "12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "200px",
                  height: "auto",
                }}
              >
                <img
                  src={anime.image_url}
                  alt={anime.title}
                  style={{
                    width: "100%",
                    height: "230px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
                <h3
                  style={{
                    marginTop: "8px",
                    fontSize: "18px",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {anime.title.length > 30 ? `${anime.title.slice(0, 22)}...` : anime.title}
                </h3>
                <p style={{ fontSize: "14px", color: "white", textAlign: "center" }}>
                  ⭐ Score: {anime.score}
                </p>
                <p style={{ fontSize: "14px", color: "white", textAlign: "center" }}>
                  📺 Episodes: {anime.episodes || "Unknown"}
                </p>
                <p style={{ fontSize: "14px", color: "white", textAlign: "center" }}>
                  {anime.status || "Unknown"}
                </p>

                <button
                  onClick={() => removeFromFavorites(index)}
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                    background: "transparent",
                    border: "none",
                    fontSize: "18px",
                    color: "#888",
                    cursor: "pointer",
                  }}
                  title="Remove from favorites"
                >
                  ❌
                </button>
              </div>
            ))
          ) : (
            <div
              style={{
                padding: "36px",
                position: "fixed",
                width: "100%",
                height: "15%",
                top: "30vh",
                left: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p style={{ fontSize: "30px", color: "white" }}>
                You have no favorite anime yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoriteAnime;
