import elasticsearch from '@elastic/elasticsearch'


export default async function handler(req, res) {


    const db = new elasticsearch.Client({ node: 'http://localhost:9200' })

    var post = {
      username: req.body.text,
      content: req.body.textarea,
      media: req.body.media
    }

    const query = req.query.topic === "undefined"
      ? { match_all : {} }
      : { match: { topic: req.query.topic } }

    const response = (await db.search({
      index: 'dawnpen-posts',
      type: 'dawnpen-posts',
      body: {
        from: req.query.from || 0,
        size: 10,
        query: query,
        sort : [{ last_update_date : {order: "desc"}}]
      }
    })).body.hits.hits

    res.status(200).json(response)


    //res.status(404).json({ error: "Not founnd" })

}
