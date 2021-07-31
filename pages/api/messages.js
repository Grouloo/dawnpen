import elasticsearch from '@elastic/elasticsearch'

import isModerator from '../../src/functions/isModerator'

import JSONData from '../../src/assets/meta.json'

export default async function handler(req, res) {

  if(JSONData.openBackoffice || (await isModerator(req, res)) == true){

    const db = new elasticsearch.Client({ node: 'http://localhost:9200' })

    const response = (await db.search({
      index: 'dawnpen-posts',
      type: 'dawnpen-posts',
      body: {
        query: {
          match_all: {}
        }
      }
    })).body.hits.hits

    res.status(200).json(response)
    return

  }

  res.status(401).json({error: "Unauthorized."})
  return

}