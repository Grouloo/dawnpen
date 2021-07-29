import elasticsearch from '@elastic/elasticsearch'

export default async function handler(req, res) {

  if (req.method === 'POST') {

    const db = new elasticsearch.Client({ node: 'http://localhost:9200' })

    if(req.body.email && req.body.type && req.body.content){

      const response = await db.index({
        index: 'dawnpen-tickets',
        type: 'dawnpen-tickets',
        body: req.body
      })

      res.status(200).json()
      return

    }else{

      res.status(400).json({ error: "Bad request." })
      return

    }

  }

}
