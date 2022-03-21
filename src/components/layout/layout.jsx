import Header from "../header/header2";
import Footer from "../footer/";

//import styles from './layout.module.css'

export default function Layout({ children }) {
  return (
    <>
      <Header/>
      <main>{children}</main>
      <Footer/>
    </>
  )
}

//Use with components/header/header2.jsx
//Cover image will show on Appbar
