import { Typography, styled as Muistyled, Button } from "@mui/material";

import styled from "styled-components/macro";

export const StyledBanner = styled.div`
  min-height: calc(100vh - 7rem);
  color: #fff;
  background-color: #000;
  position: relative;
  z-index: 2;
`;

export const StyledBannerContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 7rem);
  margin-top: auto;
  transform: translateY(-7%);
`;

export const StyledBannerText = Muistyled(Typography)`
  margin-bottom: 3rem; 
`;

export const StyledBannerSubText = Muistyled(Typography)``;

export const StyledBannerVideo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: 0.4;
  z-index: -1;

  & > video {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

export const StyledButton = Muistyled(Button)`
  margin-top: 5rem;
  height: 4rem;
  width: 11rem;
  font-size: 1.5rem;
`;
