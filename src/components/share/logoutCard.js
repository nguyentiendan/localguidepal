import React, { useState, forwardRef} from 'react';
import { useTheme, Avatar, Box, Card, CardContent, Grid, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import { signOut,} from 'next-auth/react';
import LogoutIcon from '@mui/icons-material/Logout';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide in="true" direction="down" ref={ref} {...props} />;
});

export const LogoutCard = (props) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
        onClick={handleOpen}
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
                Logout Dashbboard
              </Typography>
              {/*<Typography
                color="textPrimary"
                variant="h4"
              >
                75.5%
              </Typography>*/}
            </Grid>
            <Grid item>
              <Avatar
                sx={{
                  backgroundColor: 'warning.main',
                  height: 56,
                  width: 56
                }}
              >
                <LogoutIcon />
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
            {/*<LinearProgress
              value={75.5}
              variant="determinate"
            />*/}
            <Typography
                color="textSecondary"
                variant="caption"
            >
              Logout dashboard
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Logout Dashboard?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure logout Dashbboard
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={signOut} variant="contained">OK</Button>
        </DialogActions>
      </Dialog>
    </>
  )
};
