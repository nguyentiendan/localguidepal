import {useTheme, Grid, Avatar, Card, CardMedia, CardContent, CardActions, Rating, Typography,} from "@mui/material";
import Link from "../link";

const PopularTourCard = ({ imgSrc, imgAlt, title, desc, pagePath, ctaText }) => {
  const theme = useTheme();

  return (
    <Card sx={{
      maxWidth: 340,
      //transition: "0.5s all",
      boxShadow: theme.shadows[5],
      border: "0.1rem solid transparent",
      //borderRadius: "0.8rem",
      "&:hover": {
        boxShadow: theme.shadows[18],
        //transition: "0.5s all",
        //transform: "scale(1.1)"
      }
    }}>
      <CardMedia sx={{ height: 192 }} image={imgSrc} title={imgAlt} />
      <CardContent sx={{ paddingBottom: 0 }}>
        <Typography component="h3" variant="h5">
          {title}
        </Typography>
        <Typography component="h5" gutterBottom>
          Japan/Tokyo
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
        {/*<Button variant="contained" size="small">
          250$
        </Button>*/}
      </CardContent>
      <CardActions>
        <Grid container item justifyContent="center" sx={{ width: 170 }}>
          <Rating value={5} readOnly size="small" sx={{ color:`primary.main` }}/>
        </Grid>
        <Grid container item justifyContent="right" sx={{ width: 170 }}>
          <Avatar alt="Alex" src="/static/images/avatars/avatar_4.png" />
        </Grid>

        {/*<Link href={pagePath} underline="none">
          <Button variant="contained" size="large">
            {ctaText}
          </Button>
        </Link>*/}
      </CardActions>
    </Card>

  );
};

export default PopularTourCard;
/*380 280
340 192*/
