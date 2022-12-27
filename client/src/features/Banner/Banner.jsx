import {
  StyledBanner,
  StyledBannerSubText,
  StyledBannerText,
  StyledBannerVideo,
  StyledBannerContent,
  StyledButton,
} from "./Banner.style";

import BgVideo from "../../assets/space-bg.mp4";

function Banner() {
  return (
    <StyledBanner>
      <StyledBannerVideo>
        <video autoPlay muted loop>
          <source src={BgVideo} type="video/mp4" />
          Your browser is not supported!
        </video>
      </StyledBannerVideo>
      <StyledBannerContent maxWidth="false">
        <StyledBannerText variant="h1" fontWeight={"bold"}>
          Best place to buy rocket
        </StyledBannerText>
        <StyledBannerSubText variant="h5" fontWeight={"regular"}>
          Quis ipsum pellentesque nulla nulla elementum sagittis dictum
        </StyledBannerSubText>
        <StyledButton variant="contained" href="#search" >
          Explore
        </StyledButton>
      </StyledBannerContent>
    </StyledBanner>
  );
}

export default Banner;
