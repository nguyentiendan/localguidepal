import {Grid, Typography} from "@mui/material/";
import Image from "next/image";

const SectionHero = ({imgSrc, imgAlt, title, subTitle}) => {
  return (
    <Grid
      component="section"
      container
      sx={{
        position: `relative`,
        height: "50vh",
        width: `100vw`,
        overflow: `hidden`,
        zIndex: -100,
        mb: 0,
      }}
    >
      <Image src={imgSrc} alt={imgAlt}  objectFit="cover" placeholder="Halong Bay" priority="false"/>
      <Grid
        container
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0, .5)",
        }}
      >
        <Grid
          container
          item
          sx={{
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center"
          }}
        >
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{
              color: "common.white",
              fontWeight: 500,
            }}
          >
            {title}
          </Typography>
          <Typography
            component="p"
            variant="h4"
            align="center"
            color="common.white"
            sx={{
              mb: 10,
            }}
          >
            {subTitle}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SectionHero;
