import elasticsearch from '@elastic/elasticsearch'
import fs from 'fs'
import * as default_img from './default_pp.png'

export default async function handler(req, res){

  const db = new elasticsearch.Client({ node: 'http://localhost:9200' })

  const id = req.query.userID

  const response = (await db.search({
    index: 'dawnpen-img',
    type: 'dawnpen-img',
    body: {
      query: {
        bool: {
          must: [
            { match: {_id: id} },
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

    //var img = Buffer.from(default_img, 'base64');

    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': default_img.length
    })

    res.end(default_img)

  }

}
