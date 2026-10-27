
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getGenres, fetchCategory } from "../store";
import Slider from "../components/Slider";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.trim() || "";

  const dispatch = useDispatch();

  const genresLoaded = useSelector(
    (state) => state.streamify.genresLoaded
  );

  const [isScrolled, setIsScrolled] = useState(false);

  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!genresLoaded || !query) {
      setSearchResults([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const searchMovies = async () => {
      setLoading(true);
      setError("");

      try {
        const action = await dispatch(
          fetchCategory({
            page: "home",
            category: "searchResults",
            endpoint: `/search/multi?query=${encodeURIComponent(query)}`,
            paging: false,
            maxItems: 20,
            maxPages: 1,
          })
        );

        if (fetchCategory.fulfilled.match(action)) {
          if (!cancelled) {
            setSearchResults(
              action.payload.data.filter(
                (item) =>
                  item.mediaType === "movie" ||
                  item.mediaType === "tv"
              )
            );
          }
        } else {
          throw new Error("Unable to load search results.");
        }
      } catch (err) {
        if (!cancelled) {
          setError("Unable to load results. Please try again.");
          console.error("Search error:", err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    searchMovies();

    return () => {
      cancelled = true;
    };
  }, [dispatch, genresLoaded, query]);

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />

      <main>
        <h1>Search Results</h1>

        <p className="query">
          Results for: <strong>{query}</strong>
        </p>

        {loading && <p>Searching...</p>}

        {error && <p className="error">{error}</p>}

        {!loading && !error && query && searchResults.length === 0 && (
          <p>No movies or TV shows found.</p>
        )}

        {!loading && searchResults.length > 0 && (
          <Slider
            sections={[
              {
                title: "Movies and TV Shows",
                data: searchResults,
              },
            ]}
          />
        )}

        {!query && <p>Enter a movie or TV show name to search.</p>}
      </main>

      <Footer />
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  background: #141414;
  color: white;

  main {
    padding: 110px 3rem 50px;
    min-height: 65vh;
  }

  h1 {
    margin-bottom: 12px;
  }

  .query {
    color: #ccc;
    margin-bottom: 30px;
  }

  .error {
    color: #ff6b6b;
  }

  @media (max-width: 768px) {
    main {
      padding: 90px 1rem 35px;
    }
  }
`;
