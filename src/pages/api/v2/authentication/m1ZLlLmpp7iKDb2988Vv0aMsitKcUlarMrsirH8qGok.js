import { getToken } from 'next-auth/jwt'

const secret = process.env.SECRET

export default async (req, res) => {
  const token = await getToken({ req, secret })
  if (token) {
    res.send(JSON.stringify(token.accessToken, null, 2))
  } else {
    res.send(JSON.stringify(null))
  }
  //res.send(JSON.stringify(token, null, 2))

}
