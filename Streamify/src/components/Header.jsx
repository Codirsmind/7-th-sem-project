import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import styled from "styled-components";


export default function Header(props) {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="logo">
        <img src={logo} alt="logo" />

        <button onClick={() => navigate(props.login ? "/login" : "/signup")}>
          {props.login ? "Login" : "Sign Up"}
        </button>
      </div>
    </Container>
  );
}

const Container = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem 4rem;
  box-sizing: border-box;
  z-index: 100;

  .logo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  img {
    width: 170px;
  }

  button {
    background: #e50914;
    color: #fff;
    border: none;
    padding: 0.7rem 1.6rem;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  button:hover {
    background: #c11119;
  }

  @media (max-width: 768px) {
    padding: 1rem 2rem;

    img {
      width: 120px;
    }

    button {
      padding: 0.6rem 1.1rem;
      font-size: 0.9rem;
    }
  }
`;