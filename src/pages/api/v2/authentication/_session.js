import { getSession } from 'next-auth/react'

export default async (req, res) => {
  const session = await getSession({ req })
  if (session) {
    res.send(JSON.stringify(session, null, 2))
  } else {
    res.send(JSON.stringify(null))
  }

}
