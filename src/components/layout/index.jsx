import Head from 'next/head';
import Container from "@mui/material/Container";
import Header from "../header";
import Footer from "../footer/";

//import styles from './layout.module.css'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>LocalguidePal</title>
        <meta name="viewport" content="initial-scale=1, width=device-width"/>
      </Head>

      <Header/>
      <main>{children}</main>
      <Footer/>
    </>
  )
}
