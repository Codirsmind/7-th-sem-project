import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import video from "../assets/video.mp4";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import axios from "axios";
import { toast } from "react-toastify";
import { firebaseAuth } from "../Utils/firebase-config";
import { requireAuth } from "../Utils/requireAuth";

export default React.memo(function Card({ movieData, isLiked = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(isLiked);
  const navigate = useNavigate();
  const [showFullOverview, setShowFullOverview] = useState(false);

  // Open player with movie data
  const handlePlay = () => {
    if (!requireAuth(navigate)) return;

    navigate("/player", {
      state: {
        movie: movieData,
      },
    });
  };

  // Add / Remove from watchlist
  const handleWatchlist = async () => {
    try {
      const user = firebaseAuth.currentUser;

      if (!requireAuth(navigate)) return;

      // REMOVE
      if (isInWatchlist) {
        await axios.delete(
          `http://localhost:8080/api/watchlist/${user.uid}/${movieData.id}/${movieData.mediaType}`
        );

        setIsInWatchlist(false);

        toast.success("Removed from your watchlist.");
        return;
      }

      // ADD
      await axios.post(`${import.meta.env.VITE_API_URL}/api/watchlist`, {
        userId: user.uid,
        movieId: movieData.id,
        mediaType: movieData.mediaType,
        name: movieData.name,
        image: movieData.image,
        backdrop: movieData.backdrop,
        overview: movieData.overview,
        rating: movieData.rating,
        releaseDate: movieData.releaseDate,
        genres: movieData.genres,
      });

      setIsInWatchlist(true);

      toast.success("Added to your watchlist.");
    } catch (error) {
      console.error("Watchlist error:", error);

      if (error.response?.status === 409) {
        setIsInWatchlist(true);
        toast.info("Already in your watchlist.");
      } else {
        toast.error("Unable to update your watchlist.");
      }
    }
  };

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        className="movie-image"
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt={movieData.name}
      />

      {isHovered && (
        <div className="hover">

          <div className="image-video-container">

            {/* Hover Image */}
            <img
              className="hover-image"
              src={`https://image.tmdb.org/t/p/original${movieData.backdrop}`}
              alt={movieData.name}
              onClick={handlePlay}
            />

            {/* Hover Video */}
            <video
              className="hover-video"
              src={video}
              autoPlay
              muted
              loop
              onClick={handlePlay}
            />

          </div>

          <div className="movie-details">

            {/* Movie Title */}
            <h3
              className="movie-title"
              onClick={handlePlay}
            >
              {movieData.name}
            </h3>

            <div className="movie-info">

              <span className="match">
                ⭐ {movieData.rating?.toFixed(1)}
              </span>

              <span className="year">
                {movieData.releaseDate?.substring(0, 4)}
              </span>

              <span className="lang">
                {movieData.language?.toUpperCase()}
              </span>

            </div>

            {/* Controls */}
            <div className="controls">

              {/* PLAY */}
              <IoPlayCircleSharp
                className="icon play"
                title="Play"
                onClick={handlePlay}
              />

              {/* LIKE */}
              <RiThumbUpFill
                className="icon"
                title="Like"
                onClick={() => {
                  if (!requireAuth(navigate)) return;
                }}
              />

              {/* DISLIKE */}
              <RiThumbDownFill
                className="icon"
                title="Dislike"
                onClick={() => {
                  if (!requireAuth(navigate)) return;
                }}
              />

              {/* WATCHLIST */}
              {isInWatchlist ? (
                <BsCheck
                  className="icon"
                  title="Remove From List"
                  onClick={handleWatchlist}
                />
              ) : (
                <AiOutlinePlus
                  className="icon"
                  title="Add To My List"
                  onClick={handleWatchlist}
                />
              )}

            </div>

            {/* Overview */}
            <p className="overview">
              {showFullOverview
                ? movieData.overview
                : movieData.overview.length > 120
                  ? movieData.overview.substring(0, 120)
                  : movieData.overview}

              {movieData.overview.length > 120 && (
                <span
                  className="read-more"
                  onClick={() =>
                    setShowFullOverview(!showFullOverview)
                  }
                >
                  {showFullOverview
                    ? " Show Less"
                    : "... Read More"}
                </span>
              )}
            </p>

            {/* Genres */}
            <ul className="genres">
              {movieData.genres.map((genre) => (
                <li key={genre}>{genre}</li>
              ))}
            </ul>

          </div>
        </div>
      )}
    </Container>
  );
});




const Container = styled.div`
  /* =========================================
     MOVIE CARD - DEFAULT / DESKTOP
  ========================================= */

  width: 165px;
  height: 248px;
  position: relative;
  cursor: pointer;
  border-radius: 8px;
  flex-shrink: 0;
  transition: transform 0.35s ease;
  transform-origin: center center;


  /* =========================================
     MAIN MOVIE IMAGE
  ========================================= */

  .movie-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    display: block;
  }


  /* =========================================
     CARD HOVER
  ========================================= */

  &:hover {
    transform: scale(1.12);
    z-index: 99999;
  }


  /* =========================================
     HOVER POPUP
  ========================================= */

  .hover {
    position: absolute;
    top: -35px;
    left: 50%;

    transform: translateX(-50%);

    width: 360px;
    max-width: 90vw;

    background: #181818;

    border-radius: 12px;

    overflow: hidden;

    box-shadow:
      0 18px 45px rgba(0, 0, 0, 0.85);

    animation: popup 0.25s ease forwards;

    z-index: 999999;
  }


  /* =========================================
     POPUP ANIMATION
  ========================================= */

  @keyframes popup {
    from {
      opacity: 0;

      transform:
        translateX(-50%)
        scale(0.92);
    }

    to {
      opacity: 1;

      transform:
        translateX(-50%)
        scale(1);
    }
  }


  /* =========================================
     IMAGE / VIDEO CONTAINER
  ========================================= */

  .image-video-container {
    width: 100%;
    height: 200px;

    position: relative;

    background: #000;

    overflow: hidden;
  }


  .hover-image,
  .hover-video {
    width: 100%;
    height: 100%;

    object-fit: cover;

    display: block;
  }


  .hover-video {
    position: absolute;
    inset: 0;
  }


  /* =========================================
     MOVIE DETAILS
  ========================================= */

  .movie-details {
    padding: 1rem;
  }


  /* =========================================
     MOVIE TITLE
  ========================================= */

  .movie-title {
    color: #fff;

    font-size: 1.15rem;

    font-weight: 700;

    margin-bottom: 0.8rem;

    cursor: pointer;

    line-height: 1.3;

    overflow-wrap: break-word;
  }


  /* =========================================
     MOVIE INFO
  ========================================= */

  .movie-info {
    display: flex;

    align-items: center;

    gap: 0.7rem;

    margin-bottom: 0.9rem;

    font-size: 0.85rem;

    flex-wrap: wrap;
  }


  .match {
    color: #46d369;

    font-weight: 700;
  }


  .year,
  .lang {
    color: #d2d2d2;
  }


  /* =========================================
     OVERVIEW
  ========================================= */

  .overview {
    color: #d0d0d0;

    font-size: 0.9rem;

    line-height: 1.5;

    margin-bottom: 1rem;

    word-break: break-word;

    overflow-wrap: break-word;

    transition: all 0.3s ease;

    display: -webkit-box;

    -webkit-box-orient: vertical;

    -webkit-line-clamp: 3;

    overflow: hidden;
  }


  /* =========================================
     READ MORE
  ========================================= */

  .read-more {
    color: #46d369;

    font-weight: 600;

    cursor: pointer;

    margin-left: 4px;

    text-decoration: none;

    transition: color 0.25s ease;
  }


  .read-more:hover {
    color: #7ef0a0;

    text-decoration: none;
  }


  /* =========================================
     CONTROLS
  ========================================= */

  .controls {
    display: flex;

    align-items: center;

    gap: 0.7rem;

    margin-bottom: 1rem;
  }


  /* =========================================
     ICON BUTTON
  ========================================= */

  .icon {
    width: 38px;
    height: 38px;

    padding: 7px;

    border-radius: 50%;

    border: 2px solid
      rgba(255, 255, 255, 0.35);

    color: white;

    cursor: pointer;

    transition: all 0.25s ease;

    flex-shrink: 0;
  }


  .icon:hover {
    background: white;

    color: black;

    border-color: white;

    transform: scale(1.08);
  }


  /* =========================================
     PLAY BUTTON
  ========================================= */

  .play {
    background: white;

    color: black;

    border: none;
  }


  .play:hover {
    background: #e5e5e5;
  }


  /* =========================================
     MORE BUTTON
  ========================================= */

  .more {
    margin-left: auto;
  }


  /* =========================================
     GENRES
  ========================================= */

  .genres {
    display: flex;

    flex-wrap: wrap;

    gap: 0.45rem;

    list-style: none;

    margin: 0;

    padding: 0;
  }


  .genres li {
    color: #46d369;

    font-size: 0.82rem;

    font-weight: 600;

    white-space: nowrap;
  }


  .genres li::after {
    content: "•";

    color: #666;

    margin-left: 8px;
  }


  .genres li:last-child::after {
    display: none;
  }


  /* =========================================
     LARGE DESKTOP
     1440px+
  ========================================= */

  @media (min-width: 1440px) {

    width: 175px;
    height: 263px;

    .hover {
      width: 380px;
    }

    .image-video-container {
      height: 210px;
    }

    .movie-title {
      font-size: 1.2rem;
    }
  }


  /* =========================================
     LAPTOP
     769px - 1024px
  ========================================= */

  @media (max-width: 1024px) {

    width: 150px;
    height: 225px;

    .hover {
      width: 330px;

      max-width: 90vw;
    }

    .image-video-container {
      height: 185px;
    }

    .movie-details {
      padding: 0.9rem;
    }

    .movie-title {
      font-size: 1rem;
    }

    .movie-info {
      font-size: 0.8rem;
    }

    .overview {
      font-size: 0.85rem;
    }

    .icon {
      width: 35px;
      height: 35px;

      padding: 6px;
    }
  }


  /* =========================================
     TABLET
     481px - 768px
  ========================================= */

  @media (max-width: 768px) {

    width: 135px;
    height: 203px;

    .hover {
      width: 300px;

      max-width: 85vw;

      top: -25px;
    }

    .image-video-container {
      height: 165px;
    }

    .movie-details {
      padding: 0.85rem;
    }

    .movie-title {
      font-size: 0.95rem;

      line-height: 1.25;

      margin-bottom: 0.6rem;
    }

    .movie-info {
      gap: 0.5rem;

      font-size: 0.78rem;

      margin-bottom: 0.7rem;
    }

    .overview {
      font-size: 0.82rem;

      line-height: 1.4;

      -webkit-line-clamp: 2;

      margin-bottom: 0.8rem;
    }

    .controls {
      gap: 0.5rem;

      margin-bottom: 0.8rem;
    }

    .icon {
      width: 32px;
      height: 32px;

      padding: 6px;
    }

    .genres {
      gap: 0.35rem;
    }

    .genres li {
      font-size: 0.75rem;
    }

    .genres li::after {
      margin-left: 5px;
    }
  }


  /* =========================================
     MOBILE
     361px - 480px
  ========================================= */

  @media (max-width: 480px) {

    width: 125px;
    height: 188px;

    .hover {
      width: 280px;

      /*
        Never allow the popup to become
        wider than the phone screen.
      */
      max-width: calc(100vw - 24px);

      top: -20px;

      border-radius: 10px;
    }

    .image-video-container {
      height: 150px;
    }

    .movie-details {
      padding: 0.75rem;
    }

    .movie-title {
      font-size: 0.9rem;

      line-height: 1.25;

      margin-bottom: 0.55rem;
    }

    .movie-info {
      gap: 0.4rem;

      font-size: 0.72rem;

      margin-bottom: 0.65rem;
    }

    .overview {
      font-size: 0.78rem;

      line-height: 1.4;

      -webkit-line-clamp: 2;

      margin-bottom: 0.7rem;
    }

    .controls {
      gap: 0.45rem;

      margin-bottom: 0.7rem;
    }

    .icon {
      width: 30px;
      height: 30px;

      padding: 5px;
    }

    .genres {
      gap: 0.25rem;
    }

    .genres li {
      font-size: 0.7rem;
    }

    .genres li::after {
      margin-left: 5px;
    }
  }


  /* =========================================
     SMALL MOBILE
     320px - 360px
  ========================================= */

  @media (max-width: 360px) {

    width: 115px;
    height: 173px;

    .hover {
      width: 260px;

      max-width: calc(100vw - 20px);

      top: -15px;
    }

    .image-video-container {
      height: 140px;
    }

    .movie-details {
      padding: 0.65rem;
    }

    .movie-title {
      font-size: 0.85rem;

      margin-bottom: 0.5rem;
    }

    .movie-info {
      gap: 0.3rem;

      font-size: 0.68rem;
    }

    .overview {
      font-size: 0.75rem;

      line-height: 1.35;
    }

    .controls {
      gap: 0.35rem;
    }

    .icon {
      width: 28px;
      height: 28px;

      padding: 4px;
    }

    .genres {
      gap: 0.2rem;
    }

    .genres li {
      font-size: 0.67rem;
    }
  }


  /* =========================================
     TOUCH DEVICES
     
     Phones/tablets don't have real hover.
  ========================================= */

  @media (hover: none) and (pointer: coarse) {

    &:hover {
      transform: none;
    }

    .icon:hover {
      background: transparent;

      color: white;

      border-color:
        rgba(255, 255, 255, 0.35);

      transform: none;
    }

    .play:hover {
      background: white;

      color: black;
    }

    .read-more:hover {
      color: #46d369;
    }

    
  }
`;

