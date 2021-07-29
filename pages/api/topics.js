import elasticsearch from '@elastic/elasticsearch'

export default async function handler(req, res) {

  const db = new elasticsearch.Client({ node: 'http://localhost:9200' })

  const response = (await db.search({
    index: 'dawnpen-topics',
    type: 'dawnpen-topics',
    body: {
      query: {
        match_all: {}
      },
      //sort : [{ creation_date : {order: "asc"}}],
    }
  })).body.hits.hits

  res.status(200).json(response)
}
