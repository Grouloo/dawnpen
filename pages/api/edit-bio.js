import elasticsearch from '@elastic/elasticsearch'

import isUserLogged from '../../src/functions/isUserLogged'

export default async function handler(req, res) {

  const user = await isUserLogged(req, res)

  if(user){

    const db = new elasticsearch.Client({ node: 'http://localhost:9200' })

    if (req.method === 'PUT') {

      db.updateByQuery({
        index: 'dawnpen-signed-users',
        body: {
          script: {
            lang: 'painless',
            inline: `ctx._source.bio = "${req.body.textarea}";`
          },
          query: {
            match: {_id: user._source.userID}
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
