import elasticsearch from '@elastic/elasticsearch'

import isModerator from '../../../../src/functions/isModerator'

import JSONData from '../../../../src/assets/meta.json'

/**
 * Getting a message and its replies
 */
export default async function handler(req, res) {

    const db = new elasticsearch.Client({ node: 'http://localhost:9200' })

    if(req.method === 'GET'){

    /*
      We want the post that have the topic and the _id precised,
      but also its replies, which have the _id in their parent field
    */
    const response = (await db.search({
      index: 'dawnpen-posts',
      type: 'dawnpen-posts',
      body: {
        query: {
          bool: {
            should: [
              { match: { parent: req.query.id } },
              {
                bool: {
                  must: [
                    { term: { _id: req.query.id } },
                    { term: { topic: req.query.topic } },
                  ]
                }
              }
            ],
          }
        },
        sort : [{ creation_date : {order: "asc"}}]
      }
    })).body.hits.hits

    res.status(200).json(response)

  }if(req.method === 'DELETE'){

    if(JSONData.openBackoffice || (await isModerator(req, res)) == true){


      const response = await db.deleteByQuery({
        index: 'dawnpen-posts',
        type: 'dawnpen-posts',
        body: {
          query: {
            match: {_id: req.query.id}
          }
        }
      })

      res.status(200).json()
      return

    }

    res.status(401).json({error: "Unauthorized."})
    return

  }

}
