import React, { useState, useEffect } from 'react';
import Link from "../components/link";
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import useSWR from 'swr'
import * as API from "../apis"

const fetchGuide = async () => {
  const res = await API.getAllTourGuides();
  return res.data;
}

export default function Test({guides}) {
  const [tourGuides, setTourGuides] = useState();
  const [loading, setLoading] = useState(false);
  //const [data, setData] = useState();

  const { data:session } = useSession()
  console.log(session)

  const { t } = useTranslation('user')

  const { data, error } = useSWR('guides', fetchGuide)
  console.log(data)

  /*useEffect(() => {
    const fetchTourGuides = async () => {
      try {
        setLoading(true);
        const response = await API.getAllTourGuides();
        if (response.data.length == 0) {
          setData(0);
        } else {
          setData(response.data.length);
          setTourGuides(response.data);
        }

        // TODO : if network down or data not found => call mock API
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTourGuides();
    const interval = setInterval(() => fetchTourGuides(), 100000);
    return () => {
      clearInterval(interval);
    };
  }, []);*/

  return (
    <div>
        {t('login.page.title')}
        {/*{guides.data.map((guide,index) => {
          return (
            <div key={index}>
              {guide.id}-{guide.fullname}-<Link href="/tour?id={guide.id}">action</Link><br/>
            </div>

          );
        })}*/}

      {!session && (
        <>
          Not signed in <br />
          <button onClick={signIn}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={signOut}>Sign out</button>
        </>
      )}

      {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
    </div>
  )
}

export async function getStaticProps({ locale }) {
  //const guides = await API.getAllTourGuides();
  return {
    props: {
      ...(await serverSideTranslations(locale, ['user'])),
      // Will be passed to the page component as props
      //guides
    },
  };
}


/*export async function getServerSideProps(context) {
  const session = await getSession(context)
  console.log(session)
  //const authorized = !!session?.user.name
  return {
    //props: { authorized },
    props: {
      //...(await serverSideTranslations(locale, ['user'])),
      session,
    },
  }
}*/


/*export async function getStaticProps() {
  const guides = await API.getAllTourGuides();
  return {
    props: {
      guides,
    }
  }
}*/

/*export async function getServerSideProps(context) {
  const guides = await API.getAllTourGuides();
  //const data = await res.json()

  if (!guides) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      guides
    },
  }
}*/

