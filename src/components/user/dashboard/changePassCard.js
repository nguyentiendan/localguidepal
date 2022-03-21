import { useTheme, Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

export const ChangePassCard = (props) => {
  const theme = useTheme();

  return (
    <Card
      {...props}
      sx={{
        height: '100%',
        transition: "0.3s",
        boxShadow: theme.shadows[8],
        borderRadius:"8px",
        cursor: "pointer",
        "&:hover": {
          boxShadow: theme.shadows[16]
        }
      }}
    >
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="body"
              gutterBottom
              variant="overline"
            >
              Change Password
            </Typography>
            {/*<Typography
              color="textPrimary"
              variant="h4"
            >
              1,6k
            </Typography>*/}
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: 'success.main',
                height: 56,
                width: 56
              }}
            >
              <VpnKeyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            pt: 2
          }}
        >
          {/*<ArrowUpwardIcon color="success" />
          <Typography
            variant="body2"
            sx={{
              mr: 1
            }}
          >
            16%
          </Typography>*/}
          <Typography
            color="textSecondary"
            variant="caption"
          >
            Update your password make strong security
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
};
