import elasticsearch from '@elastic/elasticsearch'
import crypto from 'crypto'

import isModerator from '../../src/functions/isModerator'

import JSONData from '../../src/assets/meta.json'

export default async function handler(req, res) {

  if(JSONData.openBackoffice || (await isModerator(req, res)) == true){

    const db = new elasticsearch.Client({ node: 'http://localhost:9200' })

    if (req.method === 'POST') {

      var moderator = {
        name: req.body.text,
        email: req.body.email,
        password: crypto.createHash('sha256').update(req.body.password).digest('base64'),
        role: req.body.select,
        creation_date: new Date()
      }

      const response = await db.index({
        index: 'dawnpen-moderators',
        type: 'dawnpen-moderators',
        body: moderator
      })

      res.status(200).json()
      return

    }

  }

  res.status(401).json({error: "Unauthorized."})
  return

}
