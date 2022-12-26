import { Box, TextField, styled as Muistyled } from "@mui/material";
import styled from "styled-components/macro";

export const StyledContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: inherit;
`;

export const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const StyledSearchContainer = Muistyled(Box)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const StyledSearchInput = Muistyled(TextField)`
  &:not(:last-child) {
    margin-right: 3rem;
    margin-bottom: 2rem;
  }
`;

