import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/'
import { Box, Container, Grid, Typography } from '@mui/material';
import { ProfileCard } from '../../components/user/dashboard/profileCard';
import { ChangePassCard } from '../../components/user/dashboard/changePassCard';
import { LogoutCard } from '../../components/share/logoutCard';

import { TotalProfit } from '../../components/user/dashboard/total-profit';
import { useSession,  } from 'next-auth/react';
import { useRouter } from 'next/router';
import * as API from "../../apis"

const AccountSetting = () => {
  const { data:session } = useSession();
  const router = useRouter();
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        //setLoading(true);
        if (session) {
          const res = await API.getProfileMe(session.user.email);
          //if(res.data.role === 3 ) {
          //  router.push("/")
          //}
          setUser(res.data)
        }
      } catch (error) {
        console.error(error);
      } finally {
        //setLoading(false);
      }
    };
    fetchProfile();
  },[session])

  // If no session exists, display access denied message
  if (user?.role === 3) {
    return (
      <>
        <Typography variant="h3">
          Access denied
        </Typography>
      </>
    )
  }

  return (
    <>
      {user?.role !== 3 && (
      <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="lg">
        <Typography
          variant="h3"
          //textAlign="center"
        >
          Dashboard
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          //textAlign="center"
          sx={{ mb: 5 }
        }>
          Hi {user?.firstname}, you are login as {user?.role === 1 ? 'tourist':'guide'} . Check you profile.
        </Typography>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{  xs: 12, sm: 6, md: 12 }}>
            <Grid item xs={12} sm={6} md={4}>
              <ProfileCard user={user}/>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <ChangePassCard />
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <LogoutCard />
            </Grid>

            {/*<Grid item xs={12} sm={6} md={4}>
              <TotalProfit sx={{ height: '100%' }} />
            </Grid>*/}

          </Grid>
        </Container>
      </Box>
      )}
    </>
  )
};

AccountSetting.getLayout = (page) => (
  <Layout>
    {page}
  </Layout>
);

export default AccountSetting;
