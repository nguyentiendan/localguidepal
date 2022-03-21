import { withAuth } from "next-auth/middleware"
import type { NextFetchEvent, NextRequest } from 'next/server'


//export function middleware(req: NextRequest, ev: NextFetchEvent) {}

export default withAuth({
  //callbacks: {
  //  authorized: ({ token }) => token?.role === "admin",
  //},
  callbacks: {
    authorized({ token }) {
      if (token && token?.email != '') return true // If there is a token, the user is authenticated
    }
  }
})
