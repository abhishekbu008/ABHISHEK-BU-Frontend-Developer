import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
  StyledNavContainer,
  StyledNavItem,
  StyledNavList,
  StyledLogo,
} from "./Navbar.style";

function Navbar({ navItems = [] }) {
  const { user } = useAuth();

  let filteredItems = [];
  if (user) {
    filteredItems = navItems.filter((n) => n.id !== "signin");
  } else {
    filteredItems = navItems.filter((n) => n.id !== "signout");
  }

  return (
    <StyledNavContainer>
      <StyledLogo marginLeft={5} variant="h5" fontSize={20}>
        SpaceX
      </StyledLogo>
      <StyledNavList>
        {filteredItems.map((navItem) => (
          <StyledNavItem key={navItem.id}>
            <Button color={"inherit"} onClick={navItem.onClick} variant="text">
              <Typography variant="h6" fontSize={20}>
                {navItem.text}
              </Typography>
            </Button>
          </StyledNavItem>
        ))}
      </StyledNavList>
    </StyledNavContainer>
  );
}

export default Navbar;
