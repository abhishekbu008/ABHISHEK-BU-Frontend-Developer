import { Button, Typography } from "@mui/material";
import {
  StyledNavContainer,
  StyledNavItem,
  StyledNavList,
  StyledLogo
} from "./Navbar.style";

function Navbar({ navItems = [] }) {
  return (
    <StyledNavContainer>
      <StyledLogo marginLeft={5} variant="h5" fontSize={20}>SpaceX</StyledLogo>
      <StyledNavList>
        {navItems.map((navItem) => (
          <StyledNavItem key={navItem.id}>
            <Button color={'inherit'} onClick={navItem.onClick} variant="text">
              <Typography variant="h6" fontSize={20}>{navItem.text}</Typography>
            </Button>
          </StyledNavItem>
        ))}
      </StyledNavList>
    </StyledNavContainer>
  );
}

export default Navbar;
