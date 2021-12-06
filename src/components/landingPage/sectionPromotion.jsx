import { Box, Grid, Typography, Button } from "@mui/material";
import Image from "next/image";
import Link from "../link";

const SectionPromotion = ({imgSrc, imgAlt, title, btnName}) => {
  return (
    <Box
      component="section"
      container
      sx={{
        position: "relative",
        width: "100%",
        height: "60vh",
        overflow: "hidden",
        zIndex: -100,
      }}
    >
      <Image src={imgSrc} alt={imgAlt} layout="fill" objectFit="cover" priority="false" />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0, .4)",
        }}
      >
        <Grid container item xs={12} sm={12}
          sx={{
            marginTop:10,
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center"
          }}
        >
          <Typography variant="h2" align="center" gutterBottom
            sx={{
              color: "common.white",
              fontWeight: 500,
              mb: 5,
            }}
          >
            {title}
          </Typography>
          <Link href="/about-us" underline="none">
            <Button variant="contained" size="large">
              {btnName}
            </Button>
          </Link>
        </Grid>
      </Box>
    </Box>
  );
};

export default SectionPromotion
