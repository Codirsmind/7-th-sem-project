import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import styled from "styled-components";

<<<<<<< HEAD
export default function Header() {
=======
export default function Header(props) {
    const navigate = useNavigate();
>>>>>>> 61d7477ea92e7ca15190e540e7930eb8f207df2d
    return (
        <Container>
            <div className="logo">
                <img src={logo} alt="logo" />
<<<<<<< HEAD
=======
                <div>
                    <button onClick={()=> navigate(props.login ? "/login" : "signup")}>
                        {props.login ? "Login" : "Signup"}
                    </button>
                </div>
>>>>>>> 61d7477ea92e7ca15190e540e7930eb8f207df2d
            </div>
        </Container>
    );
}

const Container = styled.header`
  width: 100%;
  height: 70px;
  padding: 0 2rem;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);

  display: flex;
  align-items: center;
  justify-content: space-between;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  .logo {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .logo img {
    width: 55px;
    height: 55px;
    object-fit: contain;
  }

  @media (max-width: 768px) {
    height: 60px;
    padding: 0 1rem;

    .logo img {
      width: 45px;
      height: 45px;
    }
  }
`;