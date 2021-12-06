import { Container, Grid, Typography } from "@mui/material";
import PopularTourCard from "../popularTourCard";

const SectionPopularTour = () => {
  return (
    <Container maxWidth="lg" sx={{ my: 8 }}>
      <Typography variant="h2" textAlign="center" >
        Popular Tours
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 5 }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </Typography>
      <Grid container spacing={2}>
        <Grid container item justifyContent="center" xs={12} sm={4}>
          <PopularTourCard
            imgSrc="/static/images/tour/tour-1.jpg"
            imgAlt="food menu"
            title="Greate Tokyo city tour"
            desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, minus."
            pagePath="/about-us"
            ctaText="Check Out"
          />
        </Grid>
        <Grid container item justifyContent="center" xs={12} sm={4}>
          <PopularTourCard
            imgSrc="/static/images/tour/tour-2.jpg"
            imgAlt="catering"
            title="Nightclub tour"
            desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, minus."
            pagePath="/about-us"
            ctaText="Find Out"
          />
        </Grid>
        <Grid container item justifyContent="center" xs={12} sm={4}>
          <PopularTourCard
            imgSrc="/static/images/tour/tour-3.jpg"
            imgAlt="catering"
            title="Yamanashi tour"
            desc="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, minus."
            pagePath="/about-us"
            ctaText="Find Out"
          />
        </Grid>

      </Grid>
    </Container>
  );
};

export default SectionPopularTour;
