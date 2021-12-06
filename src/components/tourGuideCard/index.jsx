import {Grid, Avatar, Divider, Card, CardMedia, CardContent, CardActions, Typography,} from "@mui/material";
import Link from "../link";

const TourGuideCard = ({ banner, avatar, name, country, city, desc, pagePath, ctaText }) => {
  return (
    <Card sx={{ maxWidth: 340 }}>
      <CardMedia sx={{ height: 120 }} image={banner} title="" />

      <Grid container item justifyContent="center" sx={{mt:-10}}>
        <Avatar alt="Alex" src={avatar}
          sx={{ width: 140, height: 140 }}/>
      </Grid>

      <CardContent sx={{ paddingBottom: 0, paddingTop:1}}>
        <Typography component="h5" variant="h5" textAlign="center">
          {name}
        </Typography>
        <Typography component="h6" textAlign="center" gutterBottom>
          {country}/{city}
        </Typography>
        {/*<Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>*/}
      </CardContent>
      <Divider />
      <CardActions>
        <Grid container item justifyContent="center" sx={{ width: 106 }}>
          <Typography variant="h6" color="primary.main">35</Typography>
          <Grid container justifyContent="center">
            <Typography component="p" variant="body2" color="text.secondary">tours</Typography>
          </Grid>
        </Grid>

        <Grid container item justifyContent="center" sx={{ width: 106 }}>
          <Typography variant="h6" color="primary.main">12</Typography>
          <Grid container justifyContent="center">
            <Typography component="p" variant="body2" color="text.secondary">books</Typography>
          </Grid>
        </Grid>
        <Grid container item justifyContent="center" sx={{ width: 106 }}>
          <Typography variant="h6" color="primary.main">145</Typography>
          <Grid container justifyContent="center">
            <Typography component="p" variant="body2" color="text.secondary">reviews</Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>

  );
};

export default TourGuideCard;
/*380 280
340 192*/
