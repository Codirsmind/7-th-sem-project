import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styled from "styled-components";
import backgroundImage from "../assets/home.png";
import titleImage from "../assets/title.png";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory, getGenres } from "../store";
import Slider from "../components/Slider";

export default function Movies() {
    const [isScrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const genresLoaded = useSelector((state) => state.streamify.genresLoaded);
    const movies = useSelector((state) => state.streamify.movies);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGenres());
    }, []);

    useEffect(() => {
        if (!genresLoaded) return;

        dispatch(
            fetchCategory({
                page: "movies",
                category: "trending",
                endpoint: "/trending/movie/day",
            })
        );

        dispatch(
            fetchCategory({
                page: "movies",
                category: "nowPlaying",
                endpoint: "/movie/now_playing",
            })
        );

        dispatch(
            fetchCategory({
                page: "movies",
                category: "popular",
                endpoint: "/movie/popular",
            })
        );

        dispatch(
            fetchCategory({
                page: "movies",
                category: "topRated",
                endpoint: "/movie/top_rated",
            })
        );

        dispatch(
            fetchCategory({
                page: "movies",
                category: "upcoming",
                endpoint: "/movie/upcoming",
            })
        );

        dispatch(
            fetchCategory({
                page: "movies",
                category: "action",
                endpoint: "/discover/movie?with_genres=28",
            })
        );

        dispatch(
            fetchCategory({
                page: "movies",
                category: "comedy",
                endpoint: "/discover/movie?with_genres=35",
            })
        );

        dispatch(
            fetchCategory({
                page: "movies",
                category: "horror",
                endpoint: "/discover/movie?with_genres=27",
            })
        );

        dispatch(
            fetchCategory({
                page: "movies",
                category: "romance",
                endpoint: "/discover/movie?with_genres=10749",
            })
        );
    }, [genresLoaded, dispatch]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <Container>
            <Navbar isScrolled={isScrolled} />

            <Slider
                sections={[
                    { title: "Trending Movies", data: movies.trending || [] },
                    { title: "Now Playing", data: movies.nowPlaying || [] },
                    { title: "Popular Movies", data: movies.popular || [] },
                    { title: "Top Rated Movies", data: movies.topRated || [] },
                    { title: "Upcoming Movies", data: movies.upcoming || [] },
                    { title: "Action Movies", data: movies.action || [] },
                    { title: "Comedy Movies", data: movies.comedy || [] },
                    { title: "Horror Movies", data: movies.horror || [] },
                    { title: "Romance Movies", data: movies.romance || [] },
                ]}
            />
             <Footer />
        </Container>
    );
}


const Container = styled.div`
  background-color: #141414;
  min-height: 100vh;
`;

