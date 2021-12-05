import { Container, Grid } from "@mui/material";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function QuiltedImageList() {
  return (
    <Container component="section" maxWidth="lg" sx={{ mb: 10 }}>
      <Grid container item>
        <ImageList sx={{ width: `100%`, height: 450 }} variant="quilted" cols={3} gap={3}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.img}?w=161&fit=crop&auto=format`}
                srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
    </Container>
  );
}

const itemData = [
  {
    img: '/static/images/tour/tour-1.jpg',
    title: 'Breakfast',
  },
  {
    img: '/static/images/tour/tour-2.jpg',
    title: 'Burger',
  },
  {
    img: '/static/images/tour/tour-3.jpg',
    title: 'Camera',
  },
  {
    img: '/static/images/tour/tour-4.jpg',
    title: 'Coffee',
  },
  {
    img: '/static/images/tour/tour-7.jpg',
    title: 'Hats',
  },
  {
    img: '/static/images/tour/tour-9.jpg',
    title: 'Hats',
  },
];
