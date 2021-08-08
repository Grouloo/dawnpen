import elasticsearch from '@elastic/elasticsearch'
import crypto from 'crypto'
import browser from 'browser-detect';
import { serialize } from 'cookie'


export default async function handler(req, res) {

  if (req.method === 'POST') {

    const db = new elasticsearch.Client({ node: 'http://localhost:9200' })

    const user_agent = browser(req.headers['user-agent']);


    if(req.body.email && req.body.password){

      const password = crypto.createHash('sha256').update(req.body.password).digest('base64')

      const user = (await db.search({
        index: 'dawnpen-signed-users',
        type: 'dawnpen-signed-users',
        body: {
          query: {
            bool: {
              must: [
                { match: {email: req.body.email} },
                { match: {password: password } }
              ],
            }
          }
        }
      })).body.hits.hits

      if(user.length == 1){

        const access_token = await db.index({
          index: 'dawnpen-signed-users-access-tokens',
          body: {
            userID: user[0]._id,
            device: `${user_agent.name}, ${user_agent.os}`,
            creation_date: new Date()
          }
        })

        res.setHeader('Set-Cookie', serialize('dawnpen-signed-user-access-token', access_token.body._id))
        res.status(200).json()
        return

      }else{

        res.status(401).json({ message: "wrong_credentials" })
        return

      }

    }else{

      res.status(400).json({ error: "Bad request." })
      return

    }

  }

}
