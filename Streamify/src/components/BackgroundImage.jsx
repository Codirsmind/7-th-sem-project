import React from "react";
import background from "../assets/login.jpg";
import styled from "styled-components";

export default function BackgroundImage() {
  return (
    <Container>
      <img src={background} alt="Background" />
      <div className="overlay"></div>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    user-select: none;
    pointer-events: none;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.85) 0%,
      rgba(0, 0, 0, 0.5) 40%,
      rgba(0, 0, 0, 0.5) 60%,
      rgba(0, 0, 0, 0.85) 100%
    );
  }
`;