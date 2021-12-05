import Layout from '../components/layout'

export default function About() {
  return (
    <>
      About Us
    </>
  )
}

About.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
