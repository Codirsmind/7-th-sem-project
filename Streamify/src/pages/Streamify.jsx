import React, { useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";

export default function Streamify() {
  const [isScrolled, setScrolled] = useState(false);

  window.onscroll = ()=>{
    setScrolled(window.pageYOffset === 0 ? false : true);
    return ()=> (window.onscroll =null);
  };


 return (
    <Container>
      <Navbar isScrolled={isScrolled} />

      <main className="hero">
        <div className="content">
          <h1>Unlimited Movies, TV Shows, Anime & More</h1>
          <p>Discover thousands of movies and series in one place.</p>

          <button>Watch Now</button>
        </div>
      </main>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #000;
  overflow-x: hidden;

  .hero {
    height: 100vh;
    padding-top: 5rem;

    display: flex;
    align-items: center;

    background:
      linear-gradient(
        to right,
        rgba(0,0,0,.9),
        rgba(0,0,0,.55),
        rgba(0,0,0,.15)
      ),
      url("https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1920")
      center center/cover no-repeat;
  }

  .content {
    width: 600px;
    margin-left: 5rem;
    color: white;
  }

  .content h1 {
    font-size: 4rem;
    margin-bottom: 1rem;
    line-height: 1.1;
  }

  .content p {
    font-size: 1.2rem;
    color: #d1d1d1;
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .content button {
    padding: 0.9rem 2rem;
    border: none;
    border-radius: 6px;

    background: #e50914;
    color: white;

    font-size: 1rem;
    font-weight: 600;

    cursor: pointer;
    transition: 0.3s;
  }

  .content button:hover {
    background: #b20710;
  }

  @media (max-width: 768px) {
    .hero {
      padding: 5rem 2rem 0;
    }

    .content {
      margin-left: 0;
      width: 100%;
    }

    .content h1 {
      font-size: 2.5rem;
    }

    .content p {
      font-size: 1rem;
    }
  }
`;

