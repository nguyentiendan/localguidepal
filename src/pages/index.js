import Layout from '../components/layout'
import SectionHero from "../components/landingPage/sectionHero";
import SectionSearch from "../components/landingPage/sectionSearch";
//import SectionAbout from "../components/landingPage/sectionAbout";
import SectionFaq from "../components/landingPage/sectionFaq";
import SectionTourGuide from "../components/landingPage/sectionTourGuide";
import SectionPromotion from "../components/landingPage/sectionPromotion";
import SectionReview from "../components/landingPage/sectionReview";
import SectionPopularTour from "../components/landingPage/sectionPopularTour";

export default function Index() {
  return (
    <>
      <SectionHero
        imgSrc="/static/images/landingpage/home_hero.jpg"
        imgAlt="Halong Bay VN"
        title="Explore tours in Japan"
        subTitle="It is not where you travel to, it is who our travel with"
      />
      <SectionSearch/>
      <SectionTourGuide/>
      <SectionPromotion imgSrc="/static/images/promo/okinawa_1.jpg" imgAlt="okinawa"
        title="Join with us to earn extra income"
        btnName="Become Guide"
      />
      <SectionPopularTour/>
      <SectionFaq/>
      <SectionReview/>
    </>
  )
}

Index.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
