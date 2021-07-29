import elasticsearch from '@elastic/elasticsearch'

import isModerator from '../../../src/functions/isModerator'

import JSONData from '../../../src/assets/meta.json'

export default async function handler(req, res) {

  if(JSONData.openBackoffice || (await isModerator(req, res)) == true){

    const db = new elasticsearch.Client({ node: 'http://localhost:9200' })

    if(req.method == 'DELETE'){

      const response = await db.deleteByQuery({
        index: 'dawnpen-moderators',
        type: 'dawnpen-moderators',
        body: {
          query: {
            match: {_id: req.query._id}
          }
        }
      })

      res.status(200).json()
      return

    }

  }

  res.status(401).json({error: "Unauthorized."})
  return

}
