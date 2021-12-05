import {Container, Grid, Box, Card, CardContent, Button, Typography, TextField, InputAdornment, SvgIcon} from "@mui/material/";
import { Search as SearchIcon } from '../../icons/search';
import Link from "../link";

const SectionSearch = () => {
  return (
    <Container component="section" maxWidth="md" sx={{ mb: 10,mt:-8 }}>
      <Box sx={{ mt: 0 }}>
        <Card>
          <CardContent>
            <Box sx={{ maxWidth: 1000 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon color="action" fontSize="small">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search tour name, destination, or anything etc..."
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default SectionSearch;
