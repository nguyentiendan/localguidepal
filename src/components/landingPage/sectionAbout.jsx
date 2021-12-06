import { Container, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "../link";
import Button from "@mui/material/Button";
import Image from "next/image";

const SectionAbout = () => {
  return (
    <Container component="section" maxWidth="md" sx={{ mb: 10 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Image
            src="/static/images/landingpage/team.svg"
            alt="About us"
            layout="responsive"
            width={800}
            height={600}
            priority="true"
          />
        </Grid>
        <Grid item xs={12} sm={6}
          container
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography component="h2" variant="h4" textAlign="center" gutterBottom>
            About localguidepal teams
          </Typography>
          <Typography textAlign="center" sx={{ mb: 5 }}>
            {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.`}
          </Typography>
          <Link href="/about-us" underline="none">
            <Button variant="outlined" size="large">
              About Us
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SectionAbout;
