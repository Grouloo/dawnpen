import elasticsearch from '@elastic/elasticsearch'
import Cookies from 'cookies'


import JSONData from '../../src/assets/meta.json'

export default async function handler(req, res) {

  const db = new elasticsearch.Client({ node: 'http://localhost:9200' })

  const cookies = new Cookies(req, res)

  if(cookies.get('dawnpen-signed-user-access-token')){

    //Checking if the access_token is valid
  const response = (await db.search({
    index: 'dawnpen-signed-users-access-tokens',
    body: {
      query: {
        match: {
          _id: cookies.get('dawnpen-signed-user-access-token')
        }
      },
    }
  })).body.hits.hits

  console.log(response)

  if(Array.isArray(response) && response.length == 1){

    //Fetching the user data
    const user = (await db.search({
      index: 'dawnpen-signed-users',
      type: 'dawnpen-signed-users',
      body: {
        query: {
          match: {
            _id: response[0]._source.userID
          }
        },
      }
    })).body.hits.hits

    res.status(200).json(user[0])
    return

  }


  }

  res.status(401).json({error: "Unauthorized."})
  return

}
