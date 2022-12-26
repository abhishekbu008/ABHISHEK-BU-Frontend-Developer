import { Typography, styled as Muistyled } from "@mui/material";
import styled from "styled-components/macro";

export const StyledNavContainer = styled.nav`
  display: flex;
  height: 5rem;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: #000;
  color: #fff;
`;

export const StyledNavList = styled.ul`
  display: flex;
  margin-left: auto;
  list-style: none;
  margin-right: 1rem;
`;

export const StyledNavItem = styled.li`
  color: #fff;
  margin-right: 2rem;
`;

export const StyledLogo = Muistyled(Typography)`
  cursor: pointer;
  font-size: 2rem;

`;
