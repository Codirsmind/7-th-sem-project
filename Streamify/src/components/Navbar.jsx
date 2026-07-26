import React, { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";

export default function Navbar({ isScrolled }) {
  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];

  const [showSearch, setShoweSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(firebaseAuth);
      toast.success("Logout Successful");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };
  return (
    <Container>
      <nav className={isScrolled ? "scrolled" : ""}>
        <div className="left">
          <div className="brand">
            <img src={logo} alt="logo" />
          </div>

          <ul className="links">
            {links.map(({ name, link }) => (
              <li key={name}>
                <Link to={link}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="right">
          <div className={`search ${showSearch ? "show-search" : ""}`}>


            <input
              type="text"
              placeholder="Search"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShoweSearch(false);
                setInputHover(false);
              }}
            />
            <button
              onClick={() => setShoweSearch(true)}
              onBlur={() => {
                if (!inputHover) setShoweSearch(false);
              }}
            >
              <FaSearch />
            </button>
          </div>

          <button onClick={handleLogout}>
            <FaPowerOff />
          </button>
        </div>
      </nav>
    </Container>
  );
};


const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;

  nav {
    height: 5rem;
    padding: 0 4rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    background: ${({ isScrolled }) =>
      isScrolled
        ? "rgba(20,20,20,0.88)"
        : "linear-gradient(to bottom, rgba(0,0,0,.9), rgba(0,0,0,0))"};

    backdrop-filter: ${({ isScrolled }) =>
      isScrolled ? "blur(16px)" : "none"};

    -webkit-backdrop-filter: ${({ isScrolled }) =>
      isScrolled ? "blur(16px)" : "none"};

    box-shadow: ${({ isScrolled }) =>
      isScrolled ? "0 8px 30px rgba(0,0,0,.35)" : "none"};

    transition: all 0.35s ease;
  }

  /* LEFT */

  .left {
    display: flex;
    align-items: center;
    gap: 3rem;
  }

  .brand img {
    width: 110px;
    cursor: pointer;
    user-select: none;
    transition: transform 0.35s ease, filter 0.35s ease;
  }

  .brand img:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 0 10px rgba(229, 9, 20, 0.45));
  }

  /* LINKS */

  .links {
    display: flex;
    align-items: center;
    gap: 2rem;

    list-style: none;
    margin: 0;
    padding: 0;
  }

  .links li a {
    position: relative;

    color: #e5e5e5;
    text-decoration: none;

    font-size: 0.95rem;
    font-weight: 500;

    transition: color 0.3s ease;
  }

  .links li a:hover {
    color: #ffffff;
  }

  .links li a::after {
    content: "";

    position: absolute;

    left: 50%;
    bottom: -6px;

    width: 0;
    height: 2px;

    background: #e50914;

    transform: translateX(-50%);

    transition: width 0.35s ease;
  }

  .links li a:hover::after {
    width: 100%;
  }

  /* RIGHT */

  .right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  /* SEARCH */

  .search {
    display: flex;
    align-items: center;

    height: 42px;

    background: rgba(0, 0, 0, 0.45);

    border: 1px solid rgba(255, 255, 255, 0.15);

    border-radius: 6px;

    overflow: hidden;

    transition: all 0.35s ease;
  }

  .search:hover,
  .search:focus-within {
    background: rgba(0, 0, 0, 0.8);

    border-color: rgba(255, 255, 255, 0.45);

    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.35);
  }

  .search input {
    width: 0;
    opacity: 0;

    margin: 0;
    padding: 0;

    border: none;
    outline: none;

    background: transparent;

    color: #ffffff;

    font-size: 0.9rem;

    transition: all 0.35s ease;
  }

  .search input::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  .show-search input {
    width: 220px;
    opacity: 1;
    padding: 0 0.9rem;
  }

  .search button {
    width: 42px;
    height: 42px;

    border: none;
    background: transparent;

    color: #ffffff;

    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: color 0.3s ease;
  }

  .search button:hover {
    color: #e50914;
  }

  .search button svg {
    font-size: 1.1rem;
  }

  /* POWER BUTTON */

  .right > button {
    width: 42px;
    height: 42px;

    border: none;
    border-radius: 50%;

    background: transparent;

    color: #ffffff;

    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: all 0.35s ease;
  }

  .right > button:hover {
    color: #e50914;
    transform: rotate(180deg);
  }

  .right > button svg {
    font-size: 1.1rem;
  }

  /* TABLET */

  @media (max-width: 900px) {
    nav {
      padding: 0 1.5rem;
    }

    .left {
      gap: 1.5rem;
    }

    .brand img {
      width: 90px;
    }

    .links {
      gap: 1rem;
    }

    .links li a {
      font-size: 0.85rem;
    }

    .show-search input {
      width: 150px;
    }
  }

  /* MOBILE */

  @media (max-width: 768px) {
    nav {
      padding: 0 1rem;
    }

    .links {
      display: none;
    }

    .brand img {
      width: 80px;
    }

    .show-search input {
      width: 130px;
    }

    .right {
      gap: 0.6rem;
    }
  }
`;