import React, { useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar({ isScrolled }) {
    const links = [
        { name: "Home", link: "/" },
        { name: "TV Shows", link: "/tv" },
        { name: "Movies", link: "/movies" },
        { name: "My List", link: "/mylist" },
    ];

    const [showSearch, setShoweSearch] = useState(false);
    const [inputHover, setInputHover] = useState(false);

    return (
        < Container>
            <nav className={`flex ${isScrolled ? "scrolled" : ""}`}>
                <div className="left flex a-center">
                    <div className="brand flex a-center j-center">
                        <img src={logo} alt="logo" />
                    </div>
                    <ul className="links flex">
                        {
                            links.map(({ name, link }) => {
                                return (
                                    <li key={name}>
                                        <Link to={link}>{name}</Link>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
                <div className="right flex a-center">
                    <div className={`search ${showSearch ? "show-search" : ""}`}>
                        <button onFocus={() => setShoweSearch(true)} onBlur={
                            () => {
                                if (!inputHover) setShoweSearch(false);
                            }
                        }>
                            <FaSearch />
                        </button>
                    </div>
                </div>
            </nav>
        </Container>
    )
};


const Container = styled.header``