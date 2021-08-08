import elasticsearch from '@elastic/elasticsearch'
import Cookies from 'cookies'
import { serialize } from 'cookie'

import JSONData from '../../src/assets/meta.json'

export default async function handler(req, res) {

  const db = new elasticsearch.Client({ node: 'http://localhost:9200' })

  const cookies = new Cookies(req, res)

  if(cookies.get('dawnpen-signed-user-access-token')){

    //Checking if the access_token is valid
    const response = await db.deleteByQuery({
      index: 'dawnpen-signed-users-access-tokens',
      body: {
        query: {
          match: {
            _id: cookies.get('dawnpen-signed-user-access-token')
          }
        },
      }
    })

    res.setHeader('Set-Cookie', serialize('dawnpen-signed-user-access-token', ''))
    res.status(200).json()
    return

  }

  res.status(401).json({error: "Unauthorized."})
  return

}
