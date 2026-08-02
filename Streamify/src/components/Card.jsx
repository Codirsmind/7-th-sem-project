import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import video from "../assets/video.mp4";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";

export default React.memo(function Card({ movieData, isLiked = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const [showFullOverview, setShowFullOverview] = useState(false);

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
            <img
              className="hover-image"
              src={`https://image.tmdb.org/t/p/original${movieData.backdrop}`}
              alt={movieData.name}
              onClick={() => navigate("/player")}
            />

            <video
              className="hover-video"
              src={video}
              autoPlay
              muted
              loop
              onClick={() => navigate("/player")}
            />
          </div>

          <div className="movie-details">
            <h3
              className="movie-title"
              onClick={() => navigate("/player")}
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

            <div className="controls">
              <IoPlayCircleSharp
                className="icon play"
                title="Play"
                onClick={() => navigate("/player")}
              />

              <RiThumbUpFill
                className="icon"
                title="Like"
              />

              <RiThumbDownFill
                className="icon"
                title="Dislike"
              />

              {isLiked ? (
                <BsCheck
                  className="icon"
                  title="Remove From List"
                />
              ) : (
                <AiOutlinePlus
                  className="icon"
                  title="Add To My List"
                />
              )}
            </div>

            <p className="overview">
              {showFullOverview
                ? movieData.overview
                : movieData.overview.length > 120
                  ? movieData.overview.substring(0, 120)
                  : movieData.overview}

              {movieData.overview.length > 120 && (
                <span
                  className="read-more"
                  onClick={() => setShowFullOverview(!showFullOverview)}
                >
                  {showFullOverview ? " Show Less" : "... Read More"}
                </span>
              )}
            </p>

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
  width: 165px;
  height: 248px;
  position: relative;
  cursor: pointer;
  border-radius: 8px;
  flex-shrink: 0;
  transition: transform 0.35s ease;
  transform-origin: center center;

  .movie-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    display: block;
  }

  &:hover {
    transform: scale(1.12);
    z-index: 99999;
  }

  .hover {
    position: absolute;
    top: -35px;
    left: 50%;
    transform: translateX(-50%);
    width: 360px;
    background: #181818;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.85);
    animation: popup 0.25s ease forwards;
    z-index: 999999;
  }

  @keyframes popup {
    from {
      opacity: 0;
      transform: translateX(-50%) scale(0.92);
    }

    to {
      opacity: 1;
      transform: translateX(-50%) scale(1);
    }
  }

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
  }

  .hover-video {
    position: absolute;
    inset: 0;
  }

  .movie-details {
    padding: 1rem;
  }

  .movie-title {
    color: #fff;
    font-size: 1.15rem;
    font-weight: 700;
    margin-bottom: 0.8rem;
    cursor: pointer;
  }

  .movie-info {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    margin-bottom: 0.9rem;
    font-size: 0.85rem;
  }

  .match {
    color: #46d369;
    font-weight: 700;
  }

  .year,
  .lang {
    color: #d2d2d2;
  }

 .overview {
  color: #d0d0d0;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  word-break: break-word;
  overflow-wrap: break-word;
  transition: all 0.3s ease;
}

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

  .controls {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    margin-bottom: 1rem;
  }

  .icon {
    width: 38px;
    height: 38px;
    padding: 7px;

    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.35);

    color: white;
    cursor: pointer;

    transition: all 0.25s ease;
  }

  .icon:hover {
    background: white;
    color: black;
    border-color: white;
    transform: scale(1.08);
  }

  .play {
    background: white;
    color: black;
    border: none;
  }

  .play:hover {
    background: #e5e5e5;
  }

  .more {
    margin-left: auto;
  }

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
  }

  .genres li::after {
    content: "•";
    color: #666;
    margin-left: 8px;
  }

  .genres li:last-child::after {
    display: none;
  }

  @media (max-width: 1024px) {
    width: 150px;
    height: 225px;

    .hover {
      width: 330px;
    }

    .image-video-container {
      height: 185px;
    }

    .movie-title {
      font-size: 1rem;
    }
  }

  @media (max-width: 768px) {
    width: 130px;
    height: 195px;

    .hover {
      width: 300px;
    }

    .image-video-container {
      height: 170px;
    }

    .movie-title {
      font-size: 0.95rem;
    }

    .overview {
      font-size: 0.82rem;
      -webkit-line-clamp: 2;
    }

    .icon {
      width: 32px;
      height: 32px;
      padding: 6px;
    }
  }
`;