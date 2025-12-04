import React from "react";
import styled, { keyframes } from "styled-components";

// Full-screen overlay
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Stroke line drawing
const draw = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`;

// Fill fade-in
const fillIn = keyframes`
  from { fill: transparent; opacity: 0; }
  to { fill: #0A66FF; opacity: 1; }
`;

const SvgText = styled.svg`
  width: 800px;
  height: 220px;

  @media (max-width: 768px) {
    width: 90%;
    height: 180px;
  }
  @media (max-width: 480px) {
    width: 90%;
    height: 150px;
  }
  @media (max-width: 320px) {
    width: 90%;
    height: 120px;
  }
`;

const StrokeText = styled.text`
  font-size: 140px;
  font-weight: 900;
  letter-spacing: 10px;
  font-family: Arial, Helvetica, sans-serif;

  stroke: #0A66FF;
  stroke-width: 3;
  stroke-linejoin: round;
  stroke-linecap: round;
  fill: transparent;

  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: ${draw} 1.5s ease forwards;
  animation-delay: .5s;

  @media (max-width: 768px) {
    font-size: 80px;
    letter-spacing: 8px;
  }
  @media (max-width: 480px) {
    font-size: 60px;
    letter-spacing: 6px;
    stroke-width: 2.5;
  }
  @media (max-width: 320px) {
    font-size: 44px;
    letter-spacing: 4px;
    stroke-width: 2;
  }
`;

const FillText = styled.text`
  font-size: 140px;
  font-weight: 900;
  letter-spacing: 10px;
  font-family: Arial, Helvetica, sans-serif;

  fill: #0A66FF;
  opacity: 0;
  animation: ${fillIn} 1.8s ease forwards;
  animation-delay: .9s;

  @media (max-width: 768px) {
    font-size: 80px;
    letter-spacing: 8px;
  }
  @media (max-width: 480px) {
    font-size: 60px;
    letter-spacing: 6px;
  }
  @media (max-width: 320px) {
    font-size: 44px;
    letter-spacing: 4px;
  }
`;

const SportsText = styled.text`
  font-size: 46px;
  font-weight: 700;
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 6px;

  fill: #0A66FF;
  opacity: 0;
  animation: ${fillIn} 0.1s ease forwards;
  animation-delay: .1s;

  @media (max-width: 768px) {
    font-size: 32px;
    letter-spacing: 4px;
  }
  @media (max-width: 480px) {
    font-size: 24px;
    letter-spacing: 3px;
  }
  @media (max-width: 320px) {
    font-size: 18px;
    letter-spacing: 2px;
  }
`;

const Loader = () => {
  return (
    <Overlay>
      <SvgText viewBox="0 0 600 250">
        {/* SPORTS text - positioned above */}
        <SportsText
          x="50%"
          y="30%"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          SPORTS
        </SportsText>

        {/* LOVERS text - main text */}
        {/* Fill Layer */}
        <FillText x="50%" y="70%" textAnchor="middle" dominantBaseline="middle">
          LOVERS
        </FillText>

        {/* Stroke Layer */}
        <StrokeText
          x="50%"
          y="70%"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          LOVERS
        </StrokeText>
      </SvgText>
    </Overlay>
  );
};

export default Loader;
