import Layout from '../components/layout'
import SectionTopImage from "../components/tourDetail/sectionTopImage";
import SectionTop from "../components/tourDetail/sectionTop";

export default function TourDetail() {
  return (
    <>
      <SectionTop/>
      <SectionTopImage/>
    </>
  )
}

TourDetail.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
