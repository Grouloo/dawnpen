import elasticsearch from '@elastic/elasticsearch'

export default async function handler(req, res){

  const db = new elasticsearch.Client({ node: 'http://localhost:9200' })

  const splited_id = req.query.id.split('.')

  const id = splited_id[0]
  const extension = splited_id[1]

  const response = (await db.search({
    index: 'dawnpen-img',
    type: 'dawnpen-img',
    body: {
      query: {
        bool: {
          must: [
            { match: {_id: id} },
            { match: {extension: extension} }
          ]
        }
      }
    }
  })).body.hits.hits

  if(response.length == 1){

    const img = Buffer.from(response[0]._source.base64.split(",")[1], 'base64')

    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.length
    })

    res.end(img)

  }else{

    res.status(404).json({error: "Not found."})

  }

}
