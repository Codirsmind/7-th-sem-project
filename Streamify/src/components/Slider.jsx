import React from "react";
import CardSlider from "./CardSlider";
import styled from "styled-components";

export default function Slider({movies}) {

    const getMoviesFromRange = (from, to) => {
        return movies.slice(from, to);
    }

    return (
        <Container>
            <CardSlider title="Trending Now" data={getMoviesFromRange(0, 20)} />
            <CardSlider title="New Releases" data={getMoviesFromRange(20, 40)} />
            <CardSlider title="Blockbuster Movies" data={getMoviesFromRange(40, 60)} />
            <CardSlider title="Popular on Streamify" data={getMoviesFromRange(60, 80)} />
            <CardSlider title="Action Movies" data={getMoviesFromRange(80, 100)} />
            <CardSlider title="Epics" data={getMoviesFromRange(100, 120)} />
        </Container>
    )
}




const Container = styled.div`
  position: relative;
  width: 100%;
  background: #141414;

  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  padding: 0 0 2rem;

  overflow: visible;

  z-index: 1;

  @media (max-width: 1024px) {
    gap: 0.6rem;
  }

  @media (max-width: 768px) {
    gap: 0.4rem;
    padding-bottom: 1rem;
  }
`;

