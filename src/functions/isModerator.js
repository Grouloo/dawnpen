import elasticsearch from '@elastic/elasticsearch'
import Cookies from 'cookies'

/**
 * Check if the token used is owned by a moderator
 * @param {Object} req
 * @param {Object} res
 * @returns {Bool}
 */
export default async function isModerator(req, res){

  const cookies = new Cookies(req, res)

  console.log(cookies.get('dawnpen-moderator-access-token'))

  const db = new elasticsearch.Client({ node: 'http://localhost:9200' })

  //Checking if the access_token is valid
  const response = (await db.search({
    index: 'dawnpen-moderators-access-tokens',
    type: 'dawnpen-moderators-access-tokens',
    body: {
      query: {
        match: {
          _id: cookies.get('dawnpen-moderator-access-token')
        }
      },
    }
  })).body.hits.hits

  console.log(Array.isArray(response) && response.length == 1)

  return (Array.isArray(response) && response.length == 1)

}
