import { useTheme, Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Link from "../../link"

export const ProfileCard = (props) => {
  const theme = useTheme();
  let id = props?.user?.id;
  let uid = props?.user?.uid;
  return (
    <Link href={"/account/users/profile?id=" + id + "&uid=" + uid }  sx={{ textDecoration: "none", color: "primary.main" }}>
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
                View Profile
              </Typography>
              {/*<Typography
                color="textPrimary"
                variant="h4"
              >
                $24k
              </Typography>*/}
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: 'primary.main',
                  height: 56,
                  width: 56
                }}
              >
                <ManageAccountsIcon />
              </Avatar>
            </Grid>
          </Grid>
          <Box
            sx={{
              pt: 2,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {/*<ArrowDownwardIcon color="error" />
            <Typography
              color="error"
              sx={{
                mr: 1
              }}
              variant="body2"
            >
              12%
            </Typography>*/}
            <Typography
              color="textSecondary"
              variant="caption"
            >
              Since last month
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  )
};
