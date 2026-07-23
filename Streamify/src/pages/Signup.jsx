import React, { useState } from "react";
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email:"",
    password:"",
  });
  const handleClick = async() => {
    if (!showPassword) {
      setShowPassword(true);
    } else {
      // Signup Logic
      console.log("Signup");
      console.log(formValues);
    } 
  };

  return (
    <Container>
      <BackgroundImage />
      <Header login />

      <div className="body">
        <div className="text">
          <h1>Unlimited Entertainment, All in One Place</h1>
          <h2>
            Watch Your Favorite Movies, Anime and TV Shows Anytime,
            Anywhere.
          </h2>
          <h6>
            Ready to watch? Enter your email to create or restart your
            membership.
          </h6>
        </div>

        <div className="form">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={formValues.email}
            onChange={(e)=>setFormValues({...formValues,[e.target.name]:e.target.value})}
          />

          {showPassword && (
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formValues.password}
              onChange={(e)=>setFormValues({...formValues,[e.target.name]:e.target.value})}
            />
          )}

          <button onClick={handleClick}>
            {showPassword ? "Sign Up" : "Get Started"}
          </button>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;

  .body {
    position: relative;
    z-index: 1;

    min-height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text-align: center;
    color: white;

    padding: 2rem;
  }

  .text {
    max-width: 850px;
    margin-bottom: 2rem;

    h1 {
      font-size: 3.8rem;
      font-weight: 900;
      margin-bottom: 1rem;
    }

    h2 {
      font-size: 1.7rem;
      font-weight: 500;
      margin-bottom: 1rem;
    }

    h6 {
      font-size: 1.2rem;
      font-weight: 400;
    }
  }

  .form {
    width: 100%;
    max-width: 500px;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
      width: 100%;
      padding: 1rem;
      font-size: 1rem;
      color: white;
      background: rgba(22, 22, 22, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.35);
      border-radius: 4px;
      outline: none;
      box-sizing: border-box;

      &::placeholder {
        color: #b3b3b3;
      }

      &:focus {
        border-color: white;
      }
    }

    button {
      width: 100%;
      padding: 1rem;
      background: #e50914;
      color: white;
      font-size: 1.2rem;
      font-weight: 700;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: 0.3s;
    }

    button:hover {
      background: #c11119;
    }
  }

  @media (max-width: 768px) {
    .text {
      h1 {
        font-size: 2.5rem;
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