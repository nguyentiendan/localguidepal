import React, { useState, useEffect } from 'react';
import { useMediaQuery, useTheme, Grid, AppBar, Box, Drawer, IconButton, Toolbar, Fab, Typography, Tooltip, Button, Avatar, MenuList, Menu,} from '@mui/material';
import Image from "next/image";
import Home from "@mui/icons-material/Home"
import { styled } from "@mui/system";
import Link from "../link";
import Navbar from "../navbar";
import HideOnScroll from "../hideOnScroll";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import HambugerMenu from "@mui/icons-material/Menu";
import BackToTop from "../backToTop";
import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import HeaderMenu from "./headerMenu";
import * as API from "../../apis"

import heroImg from "../../../public/static/images/landingpage/home_hero.jpg";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
const MainNavbar = styled(AppBar)(({ theme }) => ({
  //backgroundColor: theme.palette.background.paper,
  //boxShadow: theme.shadows[3]
}));

const Header = () => {
  const theme = useTheme();
  const { data:session } = useSession()
  const [state, setState] = useState({
    right: false,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState();
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const navLinks = [
    { title: `home`, path: `/` },
    { title: `about us`, path: `/about-us` },
    { title: `menu`, path: `/menu` },
    { title: `catering`, path: `/catering` },
    { title: `contact`, path: `/contact` },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        //setLoading(true);
        if (session) {
          const res = await API.getProfileMe(session.user.email);
          setUser(res.data)
        }
      } catch (error) {
        console.error(error);
      } finally {
        //setLoading(false);
      }
    };
    fetchProfile();
  },[session])

  const list = (anchor) => (
    <Box
      sx={{ width: 250, marginTop: `auto`, marginBottom: `auto`}}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {navLinks.map(({ title, path }, i) => (
        <Typography
          variannt="button"
          key={`${title}${i}`}
          sx={{
            ml: 5,
            my: 2,
            textTransform: `uppercase`,
          }}
        >
          <Link sx={{ color: "common.black" }} href={path}>
            {title}
          </Link>
        </Typography>
      ))}
    </Box>
  );

  return (
    <>
      <HideOnScroll>
        <Grid
          component="section"
          container
          sx={{
            position: `relative`,
            height: "50vh",
            width: `100vw`,
            overflow: `hidden`,
            zIndex: -100,
            mb: 0,
          }}
        >
          <Image src={heroImg} priority="false"/>
          <MainNavbar position="fixed" color="transparent">
            <Toolbar sx={{ flexWrap: 'wrap' }}>
              <Typography variant="h6" color="text.primary" noWrap sx={{ flexGrow: 1 }}>
                Localguide Pal
              </Typography>
              {isMobile ? (
                /*<MobileMenu id={user?.id} uid={user?.uid} role={user?.role} />*/
                <>
                  <IconButton
                    edge="start"
                    aria-label="menu"
                    onClick={toggleDrawer("right", true)}
                    sx={{
                      color: `common.black`,
                      display: { xs: `inline`, md: `none` },
                    }}
                  >
                    <HambugerMenu fontSize="large" />
                  </IconButton>
                  <Drawer
                    anchor="right"
                    open={state.right}
                    onClose={toggleDrawer("right", false)}
                    sx={{
                      ".MuiDrawer-paper": {
                        bgcolor: "common.gray",
                        width: "250px",
                        paddingTop:"30px"
                      },
                    }}
                  >
                    {session ? (
                      <MenuList>
                        <HeaderMenu user={user}/>
                      </MenuList>
                    ) : (
                      <>
                        <Button href="/login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                          Login
                        </Button>
                        <Button href="/register" variant="contained" sx={{ my: 1, mx: 1.5 }}>
                          Sign Up
                        </Button>
                      </>
                    )}
                    {/*{list("right")}*/}
                  </Drawer>
                </>
              ) : (
                <>
                  {/*<nav>
                    <Link
                      variant="button"
                      underline="none"
                      color="text.primary"
                      href="#"
                      sx={{ my: 1, mx: 1.5 }}
                    >
                      Features
                    </Link>
                    <Link
                      variant="button"
                      underline="none"
                      color="text.primary"
                      href="#"
                      sx={{ my: 1, mx: 1.5 }}
                    >
                      Enterprise
                    </Link>
                    <Link
                      variant="button"
                      underline="none"
                      color="text.primary"
                      href="#"
                      sx={{ my: 1, mx: 1.5 }}
                    >
                      Support
                    </Link>
                  </nav>*/}

                  {session ? (
                    <Tooltip title="Account settings">
                      <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                      >
                        <Avatar sx={{ width: 32, height: 32 }} src={session.user.image} />
                        {session.user.name}
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <>
                      <Button href="/login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                        Login
                      </Button>
                      <Button href="/register" variant="contained" sx={{ my: 1, mx: 1.5 }}>
                        Sign Up
                      </Button>
                    </>
                  )}
                </>
              )}
            </Toolbar>
          </MainNavbar>
        </Grid>
      </HideOnScroll>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <HeaderMenu user={user}/>
      </Menu>
      <Offset id="back-to-top-anchor"/>
      <BackToTop>
        <Fab style={{ backgroundColor:'#f12f60' }} size="large" aria-label="back to top">
          <KeyboardArrowUp/>
        </Fab>
      </BackToTop>
    </>
  );
};

export default Header;

