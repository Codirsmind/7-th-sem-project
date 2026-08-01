import React from "react";
import CardSlider from "./CardSlider";
import styled from "styled-components";

export default function Slider({movies}) {

    const getMoviesFromRange = (from, to) => {
        return movies.slice(from, to);
    }

    return (
        <Container>
            <CardSlider title="Trending Now" data={getMoviesFromRange(0, 10)} />
            <CardSlider title="New Releases" data={getMoviesFromRange(10, 20)} />
            <CardSlider title="Blockbuster Movies" data={getMoviesFromRange(20, 30)} />
            <CardSlider title="Popular on Streamify" data={getMoviesFromRange(30, 40)} />
            <CardSlider title="Action Movies" data={getMoviesFromRange(40, 50)} />
            <CardSlider title="Epics" data={getMoviesFromRange(50, 60)} />
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

