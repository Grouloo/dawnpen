import elasticsearch from '@elastic/elasticsearch'
import crypto from 'crypto'
import browser from 'browser-detect';
import { serialize } from 'cookie'


export default async function handler(req, res) {

  if (req.method === 'POST') {

    const db = new elasticsearch.Client({ node: 'http://localhost:9200' })

    const user_agent = browser(req.headers['user-agent']);


    if(req.body.text && req.body.email && req.body.password == req.body.confirm_password){

      const password = crypto.createHash('sha256').update(req.body.password).digest('base64')

      var doesUserExists = []

      try{

        doesUserExists = (await db.search({
          index: 'dawnpen-signed-users',
          type: 'dawnpen-signed-users',
          body: {
            query: {
              bool: {
                should: [
                  { match: { username: req.body.text } },
                  { match: { email: req.body.email } }
                ],
              }
            }
          }
        })).body.hits.hits

      }catch(e){

        console.log(e)

      }

      if(doesUserExists.length == 0){

        const response = await db.index({
          index: 'dawnpen-signed-users',
          type: 'dawnpen-signed-users',
          body: {
            username: req.body.text,
            email: req.body.email,
            password: password,
            auth_type: 'email',
            picture: 'default.png',
            bio: '...',
            suspended: false,
            creation_date: new Date()
          }
        })

        const access_token = await db.index({
          index: 'dawnpen-signed-users-access-tokens',
          type: 'dawnpen-signed-users-access-tokens',
          body: {
            userID: response.body._id,
            device: `${user_agent.name}, ${user_agent.os}`,
            creation_date: new Date()
          }
        })

        res.setHeader('Set-Cookie', serialize('dawnpen-signed-user-access-token', access_token.body._id))
        res.status(200).json()
        return

      }else{

        res.status(400).json({ message: "user_already_exists" })
        return

      }

    }else{

      res.status(400).json({ error: "Bad request." })
      return

    }

  }

}
