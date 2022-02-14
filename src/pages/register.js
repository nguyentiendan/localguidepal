import React, { useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  Grid,
  Alert,
  Snackbar,
  Divider,
  Chip
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Facebook as FacebookIcon } from '../icons/facebook';
import { Google as GoogleIcon } from '../icons/google';
import {signIn} from 'next-auth/react'
import * as API from '../apis';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { t } = useTranslation('user');

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      policy: false
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          t('valid.email.must'))
        .max(100)
        .required(
          t('valid.email.required')),
      firstName: Yup
        .string()
        .max(50)
        .required(
          t('valid.fName.required')),
      lastName: Yup
        .string()
        .max(50)
        .required(
          t('valid.lName.required')),
      password: Yup
        .string()
        .max(25)
        .min(8)
        .required(
          t('valid.pass.required')),
      policy: Yup
        .boolean()
        .oneOf(
          [true],
          t('valid.term.required')
        )
    }),
    onSubmit: e => {
      handleRegister(e);
    }

  });

  const handleRegister = async (e) => {
    try {
      setLoading(true);
      const { message, status } = await API.register(
        e.firstName,
        e.lastName,
        e.email,
        e.password
      );
      if (status === true) {
        setOpen(true);
        router.push('/');
      } else {
        setErrorMessage(message)
        formik.setSubmitting(false)
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Head>
        <title>
          {t('signup.page.title')}
        </title>
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
              <Typography color="textPrimary" variant="h4">
                {t('signup.title.main')}
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                {t('signup.title.main')}
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
                  {t('signup.fb.signup')}
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  color="error"
                  startIcon={<GoogleIcon />}
                  onClick={() => signIn("google", { callbackUrl: 'http://localhost:3000/' })}
                  size="large"
                  variant="contained"
                >
                  {t('signup.gg.signup')}
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
              error={Boolean(formik.touched.firstName && formik.errors.firstName)}
              fullWidth
              helperText={formik.touched.firstName && formik.errors.firstName}
              label={t('common.input.fName')}
              margin="normal"
              name="firstName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.firstName}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.lastName && formik.errors.lastName)}
              fullWidth
              helperText={formik.touched.lastName && formik.errors.lastName}
              label={t('common.input.lName')}
              margin="normal"
              name="lastName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lastName}
              variant="outlined"
            />
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
            />
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                ml: -1
              }}
            >
              <Checkbox
                checked={formik.values.policy}
                name="policy"
                onChange={formik.handleChange}
              />
              <Typography color="textSecondary" variant="body2">
                {t('signup.term1')}
                {' '}
                <NextLink href="#" passHref>
                  <Link color="primary" underline="always" variant="subtitle2">
                    {t('signup.term2')}
                  </Link>
                </NextLink>
              </Typography>
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>
                {formik.errors.policy}
              </FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                {t('signup.btn_signup')}
              </Button>
            </Box>
            <Typography color="textSecondary" variant="body2">
              {t('signup.account')}
              {' '}
              <NextLink href="/login" passHref>
                <Link variant="subtitle2" underline="hover">
                {t('signup.signin')}
                </Link>
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert variant='filled' onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {t('alert.signup.success')}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Register;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['user'])),
    },
  };
}
