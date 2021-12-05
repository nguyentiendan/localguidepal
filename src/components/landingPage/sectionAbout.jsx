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
            src="/static/images/landingPage/team_spirit_re_yl1v.svg"
            alt="About us"
            layout="responsive"
            width={800}
            height={600}
            priority="false"
          />
        </Grid>
        <Grid item xs={12} sm={6}
          container
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography component="h2" variant="h4" textAlign="center" gutterBottom>
            A Japanese Chef Who Love Western Food
          </Typography>
          <Typography textAlign="center" sx={{ mb: 5 }}>
            {`We mix Japanese and Western ingredients and cooking methods. Provide you
            with a different tasting dimension with the fusion food in our restaurant.
            Don't miss the chance to surprise your tongue!`}
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
