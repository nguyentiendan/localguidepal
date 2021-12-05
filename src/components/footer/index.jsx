import CssBaseline from '@mui/material/CssBaseline';
import { Box, Grid, Stack, Container, Typography } from '@mui/material';
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import Link from '../link';

const StickyFooter = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.common.white,
      }}
      >
      <Grid container spacing={2}>
        <Grid item xs={6} >
          <Typography variant="h6" color="common.black" align="center">
            LocalguidePal
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Stack
            direction="row"
            justifyContent="center"
            spacing={4}
            sx={{ mb: 0 }}
          >
            <Link
              sx={{ textDecoration: "none", color: "primary.main" }}
              href="https://www.facebook.com/localguidepal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook fontSize="small" />
            </Link>
            <Link
              sx={{ textDecoration: "none", color: "primary.main" }}
              href="https://www.instagram.com/localguidepal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram fontSize="small" />
            </Link>
            <Link
              sx={{ textDecoration: "none", color: "primary.main" }}
              href="https://twitter.com/localguidepal"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter fontSize="small" />
            </Link>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" color="text.secondary" align="center">
            Copyrights ©{new Date().getFullYear()} LocalguidePal. All rights reserved
          </Typography>
        </Grid>

      </Grid>
    </Box>
  );
}

export default StickyFooter;
