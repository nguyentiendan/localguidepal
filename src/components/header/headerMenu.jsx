import React, { useState, useEffect } from 'react';
import { Avatar, MenuItem, Divider, ListItemIcon } from '@mui/material';
import Link from "../link";
import PropTypes from 'prop-types';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { signOut,} from 'next-auth/react';
import * as API from "../../apis"

const HeaderMenu = ({user}) => {

  return (
    <>
      {(user && user.role === API.ISADMIN) && (
        <div>
          <MenuItem>
            <Avatar /> Profile
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Dashboard
          </MenuItem>
          <Divider />
          <MenuItem onClick={signOut}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </div>
      )}
      {(user && user.role === API.ISGUIDE) && (
        <div>
          <MenuItem>
            <Avatar /> Profile
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Dashboard
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Create Tour
          </MenuItem>
          <Divider />
          <MenuItem onClick={signOut}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </div>
      )}
      {(user && user.role === API.ISUSER) && (
        <div>
          <MenuItem>
            <Avatar /> Profile
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <Divider />
          <MenuItem onClick={signOut}>
            <ListItemIcon>
              <Logout fontSize="small" color="#f12f60" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </div>
      )}
    </>
  )
}
HeaderMenu.propTypes = {
  user: PropTypes.object
};


export default HeaderMenu;
