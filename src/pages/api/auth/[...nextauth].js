import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from "next-auth/providers/facebook";
import CredentialProvider from "next-auth/providers/credentials";
import * as API from '../../../apis/authentication';
import getConfig from 'next/config';
import axios from 'axios';

const GOOGLE_AUTHORIZATION_URL =
  'https://accounts.google.com/o/oauth2/v2/auth?' +
  new URLSearchParams({
    prompt: 'consent',
    access_type: 'offline',
    response_type: 'code'
  })

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token) {
  console.log("Refresh Token")
  try {
    const url =
      'https://oauth2.googleapis.com/token?' +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken
      })

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST'
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken // Fall back to old refresh token
    }
  } catch (error) {
    console.log(error)
    return {
      ...token,
      error: 'RefreshAccessTokenError'
    }
  }
}

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: GOOGLE_AUTHORIZATION_URL
    }),
    CredentialProvider({
      id : "credentials",
      name: "Login",
      async authorize (credentials) {
        // database look up
        const {data, status} = await API.login(credentials.email, credentials.password)
        //const user = data;
        if (status === true) {
          //return user
          return {
            //id:data.token,
            name: data.firstname + ' ' + data.lastname,
            email: data.email,
            image:data.avatar,
            token:data.token
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: user.token || account.access_token,
          accessTokenExpires: Date.now() + account.expires_at * 1000,
          refreshToken: user.refreshToken || account.refresh_token,
        }
      }
      if (account) {
        // Return previous token if the access token has not expired yet
        if (Date.now() < token.accessTokenExpires) {
          return token
        }
        // Access token has expired, try to update it
        return refreshAccessToken(token)
      } else {
        return token
      }
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.accessTokenExpires = token.accessTokenExpires;
      return session
    },
    async signIn({user, account, profile}) {
      //Google authen
      if (account.provider === 'google' &&
        profile.email_verified === true &&
        profile.email.endsWith('@gmail.com')
      ) {
        const {data} = await API.registerGoogle(user.name, user.email, user.image, account.access_token)

        //return Promise.resolve(true)
        return true
      }

      //Email, Pass authen
      if (account.provider === 'credentials') {
        return true
        //return Promise.resolve(true)
      }
    },
  },
  events: {
    async signOut(message) { /* on signout */
      console.log("SignOut Event")
      const { publicRuntimeConfig } = getConfig();
      const baseUrl = `${publicRuntimeConfig.apiUrl}`;
      //console.log(message)
      let body = {
        email: message.token.email,
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${message.token.accessToken}`
        }
      };
      await axios.post(
        baseUrl + "/user/logout",
        body,
        config,
      ).then(response => {
        //console.log(response.data)
      })

    },
    async signIn(message) { /* on successful sign in */
      console.log("SignIn Event")
      //console.log(message)
    },
    //async createUser(message) { /* user created */},
    //async updateUser(message) { /* user updated - e.g. their email was verified */},
    //async linkAccount(message) { /* account (e.g. Twitter) linked to a user */},
    //async session(message) { /* session is active */ },
    //async error(message) { /* error in authentication flow */ }
  },
  cookie: {
    secure: process.env.NODE_ENV && process.env.NODE_ENV === 'production',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true,
  },
  session: {
    //jwt: true,
    strategy: "jwt",
    maxAge: 1 * 60 * 60, //1 hour
    //maxAge: 30 * 24 * 60 * 60, //30 days
  },

  pages: {
    signIn: "/login",
  },

  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
  //database: process.env.DATABASE_URL,

  theme: {
    colorScheme: 'auto', // "auto" | "dark" | "light"
    //brandColor: '', // Hex color code #33FF5D
    //logo: '/vercel.svg', // Absolute URL to image
  },
  debug: false,
})
