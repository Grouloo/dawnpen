import elasticsearch from '@elastic/elasticsearch'
import Cookies from 'cookies'

/**
 * Check if the token used is owned by a moderator
 * @param {Object} req
 * @param {Object} res
 * @returns {Bool}
 */
export default async function isUserLogged(req, res){

  const cookies = new Cookies(req, res)

  const db = new elasticsearch.Client({ node: 'http://localhost:9200' })

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

  if (Array.isArray(response) && response.length == 1){

    return response[0]

  }else{

    return false

  }

}
