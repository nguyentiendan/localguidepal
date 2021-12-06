import {Avatar, Grid, Card, CardContent, CardHeader, Rating, Typography,} from "@mui/material";

const CardReview = ({avatar, name, content}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={<Avatar alt={name} src={avatar} />}
        title={name}
      />
      <CardContent sx={{paddingTop:0}}>
        <Rating value={5} readOnly sx={{ color:`primary.main` }}/>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardReview;
