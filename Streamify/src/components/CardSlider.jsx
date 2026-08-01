import React, { useState } from "react";
import Card from "./Card";
import styled from "styled-components";
import { useRef } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function CardSlider({ data, title }) {
  const [showControls, setShowControls] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const listRef = useRef();

  const handleDirection = (direction) => {
  const cardWidth = 177; 
  const visibleCards = 8;

  if (direction === "left") {
    listRef.current.scrollBy({
      left: -cardWidth,
      behavior: "smooth",
    });

    if (sliderPosition > 0) {
      setSliderPosition(sliderPosition - 1);
    }
  }

  if (direction === "right") {
    listRef.current.scrollBy({
      left: cardWidth,
      behavior: "smooth",
    });

    if (sliderPosition < data.length - visibleCards) {
      setSliderPosition(sliderPosition + 1);
    }
  }
};

  return (
    <Container
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <h2 className="title">{title}</h2>

      <div className="wrapper">
        <button
          className={`slider-action left ${!showControls ? "hide" : ""}`}
          onClick={() => handleDirection("left")}
        >
          <AiOutlineLeft />
        </button>

        <div className="slider-container">
          <div className="slider" ref={listRef}>
            {data.map((movie, index) => (
              <Card
                key={movie.id}
                movieData={movie}
                index={index}
              />
            ))}
          </div>
        </div>

        <button
          className={`slider-action right ${!showControls ? "hide" : ""}`}
          onClick={() => handleDirection("right")}
        >
          <AiOutlineRight />
        </button>
      </div>
    </Container>
  );
}


const Container = styled.div`
  position: relative;
  margin: 0.8rem 0;
  overflow: visible;

  .title {
    color: #fff;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 0.6rem 3rem;
    letter-spacing: 0.4px;
  }

  .wrapper {
    position: relative;
    width: 100%;
    overflow: visible;
  }

  .slider-container {
    position: relative;
    width: 100%;
    overflow: visible;
    padding: 0.75rem 3rem;
  }

  .slider {
    display: flex;
    align-items: center;
    gap: 14px;

    overflow: visible;

    transition: transform 0.6s ease;
    will-change: transform;
  }

  .slider-action {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    width: 50px;
    height: 50px;

    display: flex;
    justify-content: center;
    align-items: center;

    border: none;
    border-radius: 50%;
    cursor: pointer;

    background: rgba(0, 0, 0, 0.7);
    color: white;

    font-size: 1.8rem;

    z-index: 999999;

    transition: all 0.25s ease;

    svg {
      transition: 0.25s;
    }

    &:hover {
      background: white;
      color: black;
      transform: translateY(-50%) scale(1.08);
    }

    &:hover svg {
      transform: scale(1.2);
    }
  }

  .left {
    left: 12px;
  }

  .right {
    right: 12px;
  }

  .hide {
    opacity: 0;
    pointer-events: none;
  }

  @media (max-width: 1024px) {
    margin: 0.7rem 0;

    .title {
      margin-left: 2rem;
      font-size: 1.3rem;
    }

    .slider-container {
      padding: 0.75rem 2rem;
    }

    .slider-action {
      width: 42px;
      height: 42px;
      font-size: 1.5rem;
    }
  }

  @media (max-width: 768px) {
    margin: 0.5rem 0;

    .title {
      margin-left: 1rem;
      margin-bottom: 0.5rem;
      font-size: 1.1rem;
    }

    .slider-container {
      padding: 0.5rem 1rem;
    }

    .slider {
      gap: 10px;
    }

    .slider-action {
      width: 36px;
      height: 36px;
      font-size: 1.2rem;
    }

    .left {
      left: 5px;
    }

    .right {
      right: 5px;
    }
  }
`;