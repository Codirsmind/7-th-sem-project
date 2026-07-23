import React from "react";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";

export default function Signup() {
  return (
    <Container>
      <BackgroundImage />
      <Header />
      <div className="body flex column a-center j-center">
        <div className="text flex column">
          <h1>Hi</h1>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  .body {
    position: relative;
    z-index: 1;

    min-height: 100vh;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 2rem;
    text-align: center;
    color: #ffffff;
  }

  .text {
    max-width: 800px;
    margin-bottom: 2.5rem;
    gap: 1rem;

    h1 {
      font-size: 3.5rem;
      font-weight: 700;
      line-height: 1.2;
    }

    h2 {
      font-size: 1.8rem;
      font-weight: 400;
    }

    h6 {
      font-size: 1.2rem;
      font-weight: 400;
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 450px;

    input {
      padding: 1rem;
      font-size: 1rem;
      border: 1px solid rgba(255, 255, 255, 0.4);
      border-radius: 6px;
      outline: none;
      background: rgba(0, 0, 0, 0.6);
      color: white;

      &::placeholder {
        color: #d1d1d1;
      }
    }

    button {
      padding: 1rem;
      font-size: 1rem;
      font-weight: 600;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: 0.3s ease;
    }

    button:first-of-type {
      background: #e50914;
      color: white;

      &:hover {
        background: #c40812;
      }
    }

    div button {
      background: transparent;
      color: white;
      border: 1px solid white;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }

  @media (max-width: 768px) {
    .text {
      h1 {
        font-size: 2.3rem;
      }

      h2 {
        font-size: 1.3rem;
      }

      h6 {
        font-size: 1rem;
      }
    }

    .form {
      max-width: 90%;
    }
  }
`;