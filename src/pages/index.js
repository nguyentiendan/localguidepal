import Head from 'next/head'
import { useEffect } from 'react'
import Layout from '../components/layout'
import SectionHero from "../components/landingPage/sectionHero";
import SectionSearch from "../components/landingPage/sectionSearch";
//import SectionAbout from "../components/landingPage/sectionAbout";
import SectionFaq from "../components/landingPage/sectionFaq";
import SectionTourGuide from "../components/landingPage/sectionTourGuide";
import SectionPromotion from "../components/landingPage/sectionPromotion";
import SectionReview from "../components/landingPage/sectionReview";
import SectionPopularTour from "../components/landingPage/sectionPopularTour";
import { signIn, signOut, useSession, } from 'next-auth/react'

import heroImg from "../../public/static/images/landingpage/home_hero.jpg";
import promoImg from "../../public/static/images/promo/okinawa_1.jpg";

export default function Home() {
  const { data:session } = useSession()

  /*useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn() // Force sign in to hopefully resolve error
    }
  }, [session])*/

  /*useEffect(()=>{
    const fetchData = async () => {
      const res = await fetch('/api/jwt')
      const json = await res.json()
      console.log(json)
    }
    fetchData()
  },[])*/

  return (
    <div>
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={signOut}>Sign out</button>
        </>
      )}
      <SectionHero
        imgSrc={heroImg}
        imgAlt="Halong Bay VN"
        title="Explore tours in Japan"
        subTitle="It is not where you travel to, it is who our travel with"
      />
      <SectionSearch/>
      <SectionTourGuide/>
      <SectionPromotion imgSrc={promoImg} imgAlt="okinawa"
        title="Join with us to earn extra income"
        btnName="Become Guide"
      />
      <SectionPopularTour/>
      <SectionFaq/>
      <SectionReview/>
    </div>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
