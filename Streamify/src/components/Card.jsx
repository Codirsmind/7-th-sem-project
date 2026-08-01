import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import video from "../assets/video.mp4";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";

export default function Card({ movieData, isLiked = false }) {

    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

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
            src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
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

          <div className="controls">
            <IoPlayCircleSharp
              className="icon play"
              title="Play"
              onClick={() => navigate("/player")}
            />

            <RiThumbUpFill className="icon" title="Like" />
            <RiThumbDownFill className="icon" title="Dislike" />

            {isLiked ? (
              <BsCheck className="icon" title="Remove From List" />
            ) : (
              <AiOutlinePlus className="icon" title="Add To My List" />
            )}

            <BiChevronDown className="icon more" title="More Info" />
          </div>

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
}



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
    z-index: 9999;
  }

  .hover {
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);

    width: 360px;
    background: #181818;
    border-radius: 12px;
    overflow: visible;

    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.8);
    animation: popup 0.25s ease forwards;
  }

  @keyframes popup {
    from {
      opacity: 0;
      transform: translateX(-50%) scale(0.9);
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
    overflow: hidden;
    background: #000;
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
    color: white;
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 0.9rem;
    line-height: 1.4;
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    margin-bottom: 1rem;
  }

  .icon {
    width: 36px;
    height: 36px;
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
    gap: 0.5rem;

    list-style: none;
    padding: 0;
    margin: 0;
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
      font-size: 1rem;
    }

    .icon {
      width: 32px;
      height: 32px;
    }
  }
`;