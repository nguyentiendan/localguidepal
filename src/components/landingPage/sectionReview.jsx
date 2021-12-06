import { Container, Grid, Typography } from "@mui/material";
import CardReview from "../reviewCard/";

const SectionReview = () => {
  return (
    <Container maxWidth="md" sx={{ my: 8, }}>
      <Typography variant="h2" textAlign="center" >
        User Review
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 5 }}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </Typography>
      <Grid container spacing={5}>
        <Grid container item justifyContent="center" xs={12} sm={6} md={4}>
          <CardReview
            avatar="/static/images/avatars/avatar_5.png"
            name="Ben Alex"
            content="I never taste something like this before. Japanese mix Western
            cuisine. Some good, some weird taste to me. Overall the cooking tastes
            good."
          />
        </Grid>

        <Grid container item justifyContent="center" xs={12} sm={6} md={4}>
          <CardReview
            avatar="/static/images/avatars/avatar_6.png"
            name="Kelly Bella"
            content="I never taste something like this before. Japanese mix Western
            cuisine. Some good, some weird taste to me. Overall the cooking tastes
            good."
          />
        </Grid>

        <Grid container item justifyContent="center" xs={12} sm={6} md={4}>
          <CardReview
            avatar="/static/images/avatars/avatar_10.png"
            name="Jonny Deep"
            content="I never taste something like this before. Japanese mix Western
            cuisine. Some good, some weird taste to me. Overall the cooking tastes
            good."
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SectionReview;
