import React, { useState, } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography, Divider, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Facebook as FacebookIcon } from '../icons/facebook';
import { Google as GoogleIcon } from '../icons/google';
import {signIn} from 'next-auth/react'
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('user');

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          t('valid.email.must'))
        .max(255)
        .required(
          t('valid.email.required')),
      password: Yup
        .string()
        .max(255)
        .required(
          t('valid.pass.required'))
    }),
    onSubmit: (e) => {
      let email = e.email;
      let password = e.password;
      signIn("credentials", {
        email, password, callbackUrl: `${window.location.origin}`, redirect: false }
      ).then(function(result) {
        if (result.error !== null) {
          if (result.status === 401 && result.ok === false) {
            setErrorMessage("Your email/password was incorrect OR account not active");
            formik.setSubmitting(false)
          }
          else {
            setErrorMessage(result.error);
          }
        }
        else {
          if (router) {
            //router.push(result.url);
            //return null;
            if (typeof window !== "undefined") {
              router.push(result.url);
            }
          }
        }
      });
    },
  });

  return (
    <>
      <Head>
        <title>{t('login.page.title')}</title>
      </Head>
      <Box component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <NextLink href="/" passHref>
            <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
              {t('common.page.back')}
            </Button>
          </NextLink>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                {t('login.title.main')}
              </Typography>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="body2"
              >
                {t('login.title.sub')}
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Button
                  color="info"
                  fullWidth
                  startIcon={<FacebookIcon />}
                  onClick={formik.handleSubmit}
                  size="large"
                  variant="contained"
                >
                  {t('login.fb.signin')}
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  color="error"
                  startIcon={<GoogleIcon />}
                  //onClick={formik.handleSubmit}
                  onClick={() => signIn("google", { callbackUrl: 'http://localhost:3000/', redirect: false } )}
                  size="large"
                  variant="contained"
                >
                  {t('login.gg.signin')}
                </Button>
              </Grid>
            </Grid>
            <Divider sx={{pb: 2, pt: 2}}>
              <Chip label="OR" />
            </Divider>
            {errorMessage && (
              <Typography component="h6" align="center"  color="textSecondary" variant="body1" style={{color:'red'}}>
                {errorMessage}
              </Typography>
            )}
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label={t('common.input.email')}
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label={t('common.input.password')}
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
              autoComplete='password'
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                {t('login.btn_signin')}
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              {t('login.notice')}
              {' '}
              <NextLink
                href="/register"
              >
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: 'pointer'
                  }}
                >
                  {t('login.signup')}
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};
export default Login;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['user'])),
    },
  };
}
