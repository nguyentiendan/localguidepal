import { Container, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from "../link";
import Button from "@mui/material/Button";
import Image from "next/image";

const SectionTop = () => {
  return (
    <Container component="section" maxWidth="lg" sx={{ mt:5,mb: 10 }}>
      <Grid container>
        <Typography component="h2" variant="h4" textAlign="left" gutterBottom>
          Greate Tokyo city tour
        </Typography>
      </Grid>
    </Container>
  );
};

export default SectionTop;
