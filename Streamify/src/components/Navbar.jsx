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
            toast.success("Logout Successful 🎉");

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

    background: rgba(8, 8, 12, 0.45);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);

    border-bottom: 1px solid rgba(255,255,255,0.08);

    transition: all .35s ease;
  }

  nav.scrolled {
    background: rgba(5,5,8,.9);
    box-shadow:
      0 8px 30px rgba(0,0,0,.5),
      0 0 20px rgba(0,255,255,.08);
  }

  /* LEFT */

  .left{
    display:flex;
    align-items:center;
    gap:3rem;
  }

  .brand img{
    width:110px;
    cursor:pointer;
    transition:.35s;
    user-select:none;
  }

  .brand img:hover{
    transform:scale(1.08);
    filter:
      drop-shadow(0 0 10px #00e5ff)
      drop-shadow(0 0 20px #00e5ff);
  }

  /* LINKS */

  .links{
    display:flex;
    align-items:center;
    gap:2.5rem;

    list-style:none;
    margin:0;
    padding:0;
  }

  .links li a{
    color:#e9e9e9;
    text-decoration:none;
    font-size:1rem;
    font-weight:600;
    letter-spacing:.5px;

    position:relative;
    transition:.3s;
  }

  .links li a::after{
    content:"";
    position:absolute;
    left:50%;
    bottom:-7px;

    width:0;
    height:2px;

    background:linear-gradient(
      90deg,
      #00f5ff,
      #7b61ff
    );

    transform:translateX(-50%);
    transition:.35s;
  }

  .links li a:hover{
    color:#ffffff;
    text-shadow:0 0 12px rgba(0,245,255,.8);
  }

  .links li a:hover::after{
    width:100%;
  }

  /* RIGHT */

  .right{
    display:flex;
    align-items:center;
    gap:1rem;
  }

  /* SEARCH */

  .search{
    display:flex;
    align-items:center;

    background:rgba(255,255,255,.05);

    border:1px solid rgba(255,255,255,.12);

    border-radius:50px;

    overflow:hidden;

    transition:.35s;
  }

  .search:hover{
    border-color:#00f5ff;
    box-shadow:
      0 0 18px rgba(0,245,255,.2);
  }

  .search input{
    width:0;
    opacity:0;

    background:transparent;
    border:none;
    outline:none;

    color:white;

    font-size:.95rem;

    transition:.35s;
  }

  .search input::placeholder{
    color:#9b9b9b;
  }

  .show-search input{
    width:220px;
    opacity:1;
    padding-left:1rem;
    padding-right:.5rem;
  }

  .search button{
    width:45px;
    height:45px;

    border:none;
    background:transparent;
    color:white;

    cursor:pointer;

    display:flex;
    justify-content:center;
    align-items:center;

    transition:.3s;
  }

  .search button:hover{
    color:#00f5ff;
  }

  .search button svg{
    font-size:1rem;
  }

  /* POWER BUTTON */

  .right>button{
    width:45px;
    height:45px;

    border:none;
    border-radius:50%;

    background:rgba(255,255,255,.06);

    color:white;

    cursor:pointer;

    display:flex;
    justify-content:center;
    align-items:center;

    transition:.35s;
  }

  .right>button:hover{
    background:linear-gradient(
      135deg,
      #ff1744,
      #ff5722
    );

    box-shadow:
      0 0 20px rgba(255,23,68,.6);

    transform:rotate(180deg);
  }

  .right>button svg{
    font-size:1rem;
  }

  /* RESPONSIVE */

 @media (max-width: 900px) {
  .links {
    display: flex;
    gap: 1rem;
  }

  .links li a {
    font-size: 0.85rem;
  }

  nav {
    padding: 0 1rem;
  }

  .brand img {
    width: 80px;
  }
}
  }
`;