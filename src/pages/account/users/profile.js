import React, { useState, useEffect } from 'react';
import Layout from '../../../components/layout/'
import NextLink from 'next/link';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { UserAvatar } from '../../../components/share/userAvatar';
import { ProfileDetail } from '../../../components/user/profile/profileDetail';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSession,  } from 'next-auth/react';
import { useRouter } from "next/router";
import * as API from "../../../apis"

const UserProfile = () => {
  const { query } = useRouter();

  return (
    <>
      <Box component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <NextLink href="/account" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              Back to Dashboard
            </Button>
          </NextLink>
          <Typography
            sx={{ mb: 3 }}
            variant="h4"
          >
            Profile
          </Typography>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
            >
              <UserAvatar id={query.id} uid={query.uid}/>
            </Grid>
            <Grid
              item
              lg={8}
              md={6}
              xs={12}
            >
              <ProfileDetail id={query.id} uid={query.uid} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
};

UserProfile.getLayout = (page) => (
  <Layout>
    {page}
  </Layout>
);

export default UserProfile;
