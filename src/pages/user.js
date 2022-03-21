import Layout from '../components/layout/'
import SectionBanner from "../components/user/sectionBanner";
import SectionProfile from "../components/user/sectionProfile";
import heroImg from "../../public/static/images/landingpage/home_hero.jpg";

export default function UserDetail() {
  return (
    <div>
       {/*<SectionBanner
        imgSrc={heroImg}
        imgAlt=""
        title=""
        subTitle=""
       />*/}
       <SectionProfile/>
    </div>
  )
}

UserDetail.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
