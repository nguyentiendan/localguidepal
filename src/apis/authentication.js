import { request } from '../utils/http';

// Login api
export function login(email, password) {
  return request({
    url: '/user/login',
    method: 'POST',
    data: { email, password },
  });
}

// Logout
export function logout(email) {
  return request({
    url: '/user/logout',
    method: 'POST',
    authRequired: true,
    data: { email },
  });
}

// Create new account
export function register(firstName, lastName, email, password) {
  return request({
    url: '/account/new',
    method: 'POST',
    data: { firstName, lastName, email, password},
  });
}

// Create new account when login with Google
export function registerGoogle(firstName, email, avatar, token, password = '') {
  return request({
    url: '/account/newAccountGoogle',
    method: 'POST',
    data: { firstName, email, avatar, token, password },
  });
}

// Verify account
export function verify(email, activeCode) {
  return request({
    url: '/account/active',
    method: 'POST',
    data: { email, activeCode },
  });
}


// Get Profile Me. Get short info from login account
export function getProfileMe(email) {
  return request({
    url: '/profile/me',
    method: 'POST',
    authRequired: true,
    data: { email },
  });
}


export function updateUserProfile(profile) {
  return request({
    url: '/account/edit',
    method: 'POST',
    authRequired: true,
    data: profile,
  });
}

export function changePassword(password, newPassword) {
  return new Promise(resolve => resolve() || password || newPassword);
}
