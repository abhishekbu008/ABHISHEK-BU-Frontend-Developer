import { Link, Typography } from "@mui/material";
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
            <Link href={navItem.link} underline="none" color={'inherit'} onClick={navItem.onClick}>
              <Typography variant="h6" fontSize={20}>{navItem.text}</Typography>
            </Link>
          </StyledNavItem>
        ))}
      </StyledNavList>
    </StyledNavContainer>
  );
}

export default Navbar;
