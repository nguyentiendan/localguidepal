import React, { useEffect, useCallback, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';

import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { useSession,  } from 'next-auth/react';
import { format } from 'date-fns'
import ShowSnackBar  from '../share/ShowSnackBar'
import * as API from "../../apis";

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};

const Input = styled('input')({
  display: 'none',
});


export const UserAvatar = (props) => {
  const { data:session } = useSession();
  const [user, setUser] = useState({});
  const { id, uid } = props
  const [avatarBlob, setAvatarBlob] = useState();

  useEffect(() => {
    const fetchShortProfile = async () => {
      try {
        //setLoading(true);
        if (session) {
          const res = await API.getShortProfile(id,uid);
          if (res.status) {
            setUser(res.data)
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        //setLoading(false);
      }
    };
    fetchShortProfile();
  },[session])

  const handleUploadAvatar = useCallback(
    async file => {
      try {
        const res = await API.uploadAvatar({ uid, file });
        setAvatarBlob(res.data)
      } catch (e) {
        // ignored
      }
    },
    [uid]
  );

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={avatarBlob || user.avatar}
            sx={{
              height: 140,
              mb: 2,
              width: 140
            }}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {user.firstname} {' '} {user.lastname}
          </Typography>
          {/*<Typography
            color="textSecondary"
            variant="body2"
          >
            {`${user.city} ${user.country}`}
          </Typography>*/}
          <Typography
            color="textSecondary"
            variant="body2"
          >
            Joined from {user.createdat}
            {/*{format(user.createdat, 'dd/MM/yyyy')}*/}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Stack direction="row"  alignItems="stretch" justifyContent="center" spacing={2}>
          <label htmlFor="contained-button-file">
            <Input accept="image/*" id="contained-button-file" name="avatar" type="file"
              onChange={e => {
                handleUploadAvatar(e.target.files[0]);
              }}
            />
            <Button size="large" color="primary" fullWidth variant="text" component="span" startIcon={<PhotoCamera />}>
              Upload picture
            </Button>
          </label>

        </Stack>
      </CardActions>
    </Card>
  );
};
