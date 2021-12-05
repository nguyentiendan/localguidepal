import Layout from '../components/layout'
import SectionHero from "../components/landingPage/sectionHero";
import SectionSearch from "../components/landingPage/sectionSearch";
import SectionAbout from "../components/landingPage/sectionAbout";
import SectionTourGuide from "../components/landingPage/sectionTourGuide";
import SectionImage from "../components/landingPage/sectionImage";
import SectionReview from "../components/landingPage/sectionReview";
import SectionPopularTour from "../components/landingPage/sectionPopularTour";

export default function Index() {
  return (
    <>
      <SectionHero
        imgSrc="/static/images/landingPage/home_hero.jpg"
        imgAlt="Halong Bay VN"
        title="Explore tours in Japan"
        subTitle="It is not where you travel to, it is who our travel with"
      />
      <SectionSearch/>
      <SectionTourGuide/>
      <SectionImage imgSrc="/static/images/landingPage/image_1.jpg" imgAlt="fusion food" />
      <SectionPopularTour/>
      <SectionAbout/>
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
