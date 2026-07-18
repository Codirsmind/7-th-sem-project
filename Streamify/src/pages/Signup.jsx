import React from "react";
import styled from "styled-components";
// import BackgroundImage from "../components/BackgroundImage";
// import Header from "../components/Header";

export default function Signup() {
  return (
    <Container>
      {/* <BackgroundImage /> */}
      {/* <Header /> */}
      <div className="body flex column a-center j-center">
        <div className="text flex column">
          <h1>Hi</h1>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;