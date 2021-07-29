import elasticsearch from '@elastic/elasticsearch'

import isModerator from '../../../src/functions/isModerator'

import JSONData from '../../../src/assets/meta.json'

export default async function handler(req, res) {

  const db = new elasticsearch.Client({ node: 'http://localhost:9200' })

  const { id } = req.query

  if(req.method === 'GET'){

    const response = (await db.search({
      index: 'dawnpen-topics',
      type: 'dawnpen-topics',
      body: {
        query: {
          match: {
            id: id
          }
        },
      }
    })).body.hits.hits

    if(response && response[0]){

      res.status(200).json(response[0])

    }else{

      res.status(404).json({error: "Nothing found."})

    }

  }else if(req.method === 'DELETE'){

    if(JSONData.openBackoffice || (await isModerator(req, res)) == true){

      const db = new elasticsearch.Client({ node: 'http://localhost:9200' })

      if(req.method == 'DELETE'){


        const response = await db.deleteByQuery({
          index: 'dawnpen-topics',
          type: 'dawnpen-topics',
          body: {
            query: {
              match: {_id: id}
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

}
