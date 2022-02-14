import React, { useEffect } from 'react';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react'
import { CacheProvider } from '@emotion/react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../../next-i18next.config'
import { theme } from '../assets/theme/';
import "../assets/css/global.css";

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component,  pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
    {getLayout(<Component {...pageProps} />)}
    </>
  );
};

const AppWithI18n = appWithTranslation(MyApp, nextI18NextConfig);

function AppWithAuth(props) {
  const { emotionCache = clientSideEmotionCache } = props;
  return (
    <React.Fragment>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>LocalguidePal</title>
        </Head>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SessionProvider session={props.session} options={{ clientMaxAge: 0 }} refetchInterval={0}>
              <AppWithI18n {...props} />
            </SessionProvider>
          </ThemeProvider>
        </LocalizationProvider>
      </CacheProvider>
    </React.Fragment>
  );
}

export default AppWithAuth;
