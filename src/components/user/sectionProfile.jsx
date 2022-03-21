import React, { useEffect, useState } from 'react'
import {useTheme,Container, Grid, Divider, IconButton, Card, CardActions, CardContent, CardMedia, Avatar, Typography,} from "@mui/material/";
import ReportIcon from '@mui/icons-material/Report';
import * as API from "../../apis"

const avatar = "/static/images/avatars/avatar_1.png"

const SectionProfile = () => {
  const theme = useTheme();
  const [bannerImg, setBannerImg] = useState('');

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const banner = await API.getAllBanner();
        const values = Object.values(banner)
        const ranImg = values[parseInt(Math.random() * values.length)]
        setBannerImg(ranImg.image)
      } catch (error) {
        console.error(error);
      } finally {
        //setLoading(false);
      }
    };
    fetchBanner();
  },[])

  return (
    <Container component="section" maxWidth="lg" sx={{ }}>
      <Card sx={{
        mt:5,
        maxWidth: "lg",
        transition: "0.3s",
        boxShadow: theme.shadows[8],
        borderRadius:"5px",
        "&:hover": {
          boxShadow: theme.shadows[16]
        }
      }}>
        {bannerImg && (
          <CardMedia sx={{ height: 250 }} image={bannerImg} title="localguidepal banner" />
        )}
        <Grid container item justifyContent="center" sx={{mt:-10}}>
          <Avatar alt="Alex" src={avatar} sx={{ width: 140, height: 140 }}/>
        </Grid>

        <CardContent sx={{ paddingBottom: 0, paddingTop:1}}>
          <Typography component="h5" variant="h5" textAlign="center">
            Kevin Nguyen
          </Typography>
          <Typography textAlign="center" variant="body2" color="text.secondary" gutterBottom>
            Joined in 2020 as a traveller
          </Typography>
        </CardContent>
        <Divider />
        <CardActions>
          <Grid container item justifyContent="center" sx={{ alignItem:"center" }}>
            <IconButton aria-label="report">
              <ReportIcon sx={{color:"#f12f60"}}/>
              <Typography component="p" variant="body2" color="text.secondary">Report this account</Typography>
            </IconButton>
          </Grid>
        </CardActions>
      </Card>
    </Container>
  );
};

export default SectionProfile;
