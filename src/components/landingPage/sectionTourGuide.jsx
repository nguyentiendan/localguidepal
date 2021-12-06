import { Container, Grid, Typography } from "@mui/material";
import TourGuideCard from "../tourGuideCard";

const SectionTourGuide = () => {
  return (
    <Container maxWidth="lg" sx={{ my: 8 }}>
      <Typography variant="h2" textAlign="center" >
        Our tour guide
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 5 }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </Typography>
      <Grid container spacing={2}>
        <Grid container item justifyContent="center" xs={12} sm={4}>
          <TourGuideCard
            banner="/static/images/tour/tour-5.jpg"
            avatar="/static/images/avatars/avatar_5.png"
            name="Ben Alex"
            country="Japan"
            city="Tokyo"
            desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, minus."
            pagePath="/about-us"
            ctaText="Check Out"
          />
        </Grid>
        <Grid container item justifyContent="center" xs={12} sm={4}>
          <TourGuideCard
            banner="/static/images/tour/tour-3.jpg"
            avatar="/static/images/avatars/avatar_6.png"
            name="Jonny Deep"
            country="Japan"
            city="Kyoto"
            desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, minus."
            pagePath="/about-us"
            ctaText="Find Out"
          />
        </Grid>
        <Grid container item justifyContent="center" xs={12} sm={4}>
          <TourGuideCard
            banner="/static/images/tour/tour-4.jpg"
            avatar="/static/images/avatars/avatar_7.png"
            name="Jen Bella"
            country="Japan"
            city="Osaka"
            desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, minus."
            pagePath="/about-us"
            ctaText="Find Out"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SectionTourGuide;
