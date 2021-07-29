import elasticsearch from '@elastic/elasticsearch'
import crypto from 'crypto'
import { serialize } from 'cookie'

import isModerator from '../../src/functions/isModerator'

import JSONData from '../../src/assets/meta.json'

export default async function handler(req, res) {

  const db = new elasticsearch.Client({ node: 'http://localhost:9200' })

  if (req.method === 'POST') {

    const moderator = (await db.search({
      index: 'dawnpen-moderators',
      type: 'dawnpen-moderators',
      body: {
        query: {
          bool: {
            must: [
              { match: {email: req.body.email} },
              { match: {password: crypto.createHash('sha256').update(req.body.password).digest('base64')} }
            ]
          }
        }
      }
    })).body.hits.hits

    if(moderator.length == 1){

      const response = await db.index({
        index: 'dawnpen-moderators-access-tokens',
        type: 'dawnpen-moderators-access-tokens',
        body: {
          moderatorID: moderator[0]._id,
          creation_date: new Date()
        }
      })

      res.setHeader('Set-Cookie', serialize('dawnpen-moderator-access-token', response.body._id))
      res.status(200).json()
      return

    }else{

      res.status(401).json({error: "Unauthorized."})
      return

    }

  }

}
