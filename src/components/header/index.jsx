import { AppBar, IconButton, Toolbar, Container } from '@mui/material';
import Home from "@mui/icons-material/Home"
import { styled } from "@mui/system";
import Link from "../link";
import Navbar from "../navbar";
import SideDrawer from "../sideDrawer";
import HideOnScroll from "../hideOnScroll";
import Fab from "@mui/material/Fab";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import BackToTop from "../backToTop";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
const MainNavbar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

const navLinks = [
  { title: `home`, path: `/` },
  { title: `about us`, path: `/about-us` },
  { title: `menu`, path: `/menu` },
  { title: `catering`, path: `/catering` },
  { title: `contact`, path: `/contact` },
];

const Header = () => {
  return (
    <>
      <HideOnScroll>
        <MainNavbar position="fixed">
          <Toolbar color="secondary.light">
            <Container
              maxWidth="lg"
              sx={{ display: `flex`, justifyContent: `space-between` }}
            >
              <IconButton edge="start" aria-label="home">
                <Link activeClassName="active" href="/">
                  <Home
                    sx={{
                      color: (theme) => theme.palette.common.black,
                    }}
                    fontSize="large"
                  />
                </Link>
              </IconButton>
              <Navbar navLinks={navLinks} />
              <SideDrawer navLinks={navLinks} />
            </Container>
          </Toolbar>
        </MainNavbar>
      </HideOnScroll>
      <Offset id="back-to-top-anchor"/>
      <BackToTop>
        <Fab color="secondary.light" size="large" aria-label="back to top">
          <KeyboardArrowUp />
        </Fab>
      </BackToTop>
    </>
  );
};

export default Header;
