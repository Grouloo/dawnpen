import elasticsearch from '@elastic/elasticsearch'

import isModerator from '../../../src/functions/isModerator'

import JSONData from '../../../src/assets/meta.json'

export default async function handler(req, res) {

  const db = new elasticsearch.Client({ node: 'http://localhost:9200' })

  const { userID } = req.query

  if(req.method === 'GET'){

    const response = (await db.search({
      index: 'dawnpen-signed-users',
      body: {
        _source: ['username', 'picture', 'bio'],
        query: {
          match: {
            _id: userID
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

      if(req.method == 'DELETE'){

        const response = await db.deleteByQuery({
          index: 'dawnpen-signed-users',
          body: {
            query: {
              match: {_id: userID}
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
