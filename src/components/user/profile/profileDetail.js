import React, { useState, useEffect, useCallback } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useFormik, } from 'formik';
import * as Yup from 'yup';
import { useSession,  } from 'next-auth/react';
import ShowSnackBar  from '../../share/ShowSnackBar'
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

import * as API from "../../../apis";

const gender = [
  {
    value: 'Male',
    label: 'Male'
  },
  {
    value: 'Female',
    label: 'Female'
  },
  {
    value: 'Other',
    label: 'Other'
  }
];

export const ProfileDetail = (props) => {
  const { id, uid } = props
  const { data:session } = useSession();
  const theme = useTheme();
  const [values, setValues] = useState({});
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedState, setSelectedState] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMobile)

  const formik = useFormik({
    initialValues: {
      uid:'',
      firstname: '',
      lastname: '',
      email: '',
      mobile: '',
      birthday: '',
      occupation: '',
      gender: 'Male',
      country: '',
      state: '',
      city: '',
    },
    validationSchema: Yup.object({
      firstname: Yup
        .string()
        .max(100)
        .required("Firstname is required"),
      lastname: Yup
        .string()
        .max(100)
        .required("Lastname is required"),
      email: Yup
        .string()
        .email("Must be a valid email")
        .max(150)
        .required("Email is required"),
      mobile: Yup
        .string()
        .max(12)
    }),
    onSubmit: (e) => {
      handleUpdateProfile(e);
    },
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        //setLoading(true);
        if (session) {
          const res = await API.getUserProfile(id, uid);
          if (res.status) {
            //formik.values.id = id;
            formik.values.uid = uid;
            formik.values.firstname = res.data.firstname;
            formik.values.lastname = res.data.lastname;
            formik.values.email = res.data.email;
            formik.values.mobile = res.data.mobile;
            formik.values.birthday = res.data.birthday;
            formik.values.gender = res.data.gender;
            formik.values.occupation = res.data.occupation;
            formik.values.country = res.data.country;
            formik.values.state = res.data.state;
            formik.values.city = res.data.city;
            setValues()

            if (res.data.country) {
              const countryByName = await API.getCountryByName(res.data.country)
              if (countryByName.id > 0 ) {
                setSelectedCountry(countryByName.id)
                if (res.data.state) {
                  const stateByName = await API.getStateByName(res.data.state)
                  const states = await API.getAllState(countryByName.id);
                  setState(states)
                  setSelectedState(stateByName.id);
                  if (res.data.city) {
                    const cityByName = await API.getCityByName(res.data.city)
                    const city = await API.getAllCity(stateByName.id);
                    setCity(city)
                    setSelectedCity(cityByName.id);
                  }
                } else {
                  const states = await API.getAllState(countryByName.id);
                  setState(states)
                }
              }
            }
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        //setLoading(false);
      }
    };
    fetchUserProfile();
  },[session])

  const handleUpdateProfile = async (event) => {
    console.log(values)
    if (values) {
      formik.values.birthday = values
    }
    console.log(event)
    formik.setSubmitting(false)
    try {
      const { status, message } = await API.updateBasic({...event});
      if (status === true) {
        setMessage(message)
        setOpen(true);
        setTimeout(function() {
          formik.setSubmitting(false)
        }, 4000);
      }
    } catch (e) {
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const country = await API.getAllCountry();
        setCountry(country)
      } catch (error) {
      }
    };
    fetchAll();
  },[])

  const handleCountryChange = async (e) => {
    const countryId = e.target.value
    setSelectedCountry(countryId)
    setSelectedState()
    setSelectedCity()

    const countryName = await API.getCountryById(countryId)
    formik.values.country = countryName.name

    if (countryId > 0 ) {
      const states = await API.getAllState(countryId);
      setState(states)
      setCity()
    }
  };

  const handleStateChange = async (e) => {
    let stateId = e.target.value
    setSelectedState(stateId)
    setSelectedCity()
    const stateName = await API.getStateById(stateId)
    formik.values.state = stateName.name
    if (stateName.id > 0 ) {
      const city = await API.getAllCity(stateId);
      setCity(city)
    }
  };

  const handleCityChange = async (e) => {
    let cityId = e.target.value
    setSelectedCity(cityId)
    const cityName = await API.getCityById(cityId)
    formik.values.city = cityName.name
  };

  return (
    <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.firstname && formik.errors.firstname)}
                helperText={formik.touched.firstname && formik.errors.firstname}
                fullWidth
                //helperText="Please specify the first name"
                label="First name"
                name="firstname"
                onBlur={formik.handleChange}
                onChange={formik.handleChange}
                required
                value={formik.values.firstname}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.lastname && formik.errors.lastname)}
                helperText={formik.touched.lastname && formik.errors.lastname}
                fullWidth
                label="Last name"
                name="lastname"
                onBlur={formik.handleChange}
                onChange={formik.handleChange}
                required
                value={formik.values.lastname}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                helperText="Email is can not change"
                onChange={formik.handleChange}
                required
                value={formik.values.email}
                variant="outlined"
                disabled
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              {isMobile ? (
                <>
                  <MobileDatePicker
                    value={values || formik.values.birthday}
                    minDate={new Date('1970-01-01')}
                    onChange={(newValue) => {
                      setValues(newValue);
                    }}
                    renderInput={(params) =>
                      <TextField
                        {...params} fullWidth label="Birthday" name="birthday" variant="outlined"
                        error={Boolean(formik.touched.birthday && formik.errors.birthday)}
                        helperText={formik.touched.birthday && formik.errors.birthday}
                      />}
                  />
                </>
              ) : (
                <>
                  <DesktopDatePicker
                    value={values || formik.values.birthday}
                    minDate={new Date('1970-01-01')}
                    onChange={(newValue) => {
                      setValues(newValue);
                    }}
                    renderInput={(params) =>
                      <TextField
                        {...params} fullWidth label="Birthday" name="birthday" variant="outlined"
                        error={Boolean(formik.touched.birthday && formik.errors.birthday)}
                        helperText={formik.touched.birthday && formik.errors.birthday}
                      />}
                  />
                </>
              )}
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.mobile && formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile}
                fullWidth
                label="Mobile Phone"
                name="mobile"
                onChange={formik.handleChange}
                value={formik.values.mobile}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.mobile && formik.errors.mobile)}
                helperText={formik.touched.mobile && formik.errors.mobile}
                fullWidth
                label="Occupation"
                name="occupation"
                onChange={formik.handleChange}
                value={formik.values.occupation}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Gender"
                name="gender"
                select
                SelectProps={{ native: false }}
                onChange={formik.handleChange}
                value={formik.values.gender}
                variant="outlined"
              >
                {gender.map((gd) => (
                   <MenuItem key={gd.value} value={gd.value}>
                     {gd.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={4} key="1">
              <FormControl fullWidth>
                <InputLabel>Countries</InputLabel>
                <Select
                  value={selectedCountry || ''}
                  defaultValue={''}
                  label="Countries"
                  onChange={handleCountryChange}
                  variant="outlined"
                >
                  {country && country.map((ct) => (
                    <MenuItem key={ct.id} value={ct.id}>
                      {ct.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4} key="2">
              <FormControl fullWidth>
                <InputLabel>States</InputLabel>
                <Select
                  value={selectedState || ''}
                  defaultValue={''}
                  label="States"
                  onChange={handleStateChange}
                  variant="outlined"
                >
                  {state && state.map((st) => (
                    <MenuItem key={st.id} value={st.id}>
                      {st.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4} key="3">
              <FormControl fullWidth>
                <InputLabel>Cities</InputLabel>
                <Select
                  value={selectedCity || ''}
                  defaultValue={''}
                  label="Cities"
                  onChange={handleCityChange}
                  variant="outlined"
                >
                  {city && city.map((ct) => (
                    <MenuItem key={ct.id} value={ct.id}>
                      {ct.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <NextLink href="/account" passHref>
            <Button
              //color="primary"
              variant="outlined"
              sx={{mr:2}}
            >
              Cancel
            </Button>
          </NextLink>
          {' '}
          <Button
            color="primary"
            //fullWidth
            disabled={formik.isSubmitting}
            size="large"
            type="submit"
            variant="contained"
          >
            Update
          </Button>
        </Box>
      </Card>
      <div>
        <ShowSnackBar
          message={message}
          show={open}
          handleClose={handleClose}
        />
      </div>
    </form>
  );
};
