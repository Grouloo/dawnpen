import elasticsearch from '@elastic/elasticsearch'


export default async function handler(req, res) {

  if (req.method === 'POST') {

    const db = new elasticsearch.Client({ node: 'http://localhost:9200' })

    var post = {
      username: req.body.text,
      content: req.body.textarea,
      media: req.body.media
    }

    //Checking that the post is correct
    if(0 < post.username.length && post.username.length < 32){

      if(0 < post.content.length && post.content.length < 5000){

        //The post shouldn't have the properties [topic] and [parent] at the same time
        if(!req.body.parent) post.topic = req.body.topic
        else post.parent = req.body.parent

        //Date
        post.creation_date = new Date()
        post.last_update_date = new Date()

        post.nb_replies = 0

        const response = await db.index({
          index: 'dawnpen-posts',
          type: 'dawnpen-posts',
          body: post
        })

        //If it's a reply, we have to update the parent
        if(post.parent){

          var date = new Date()

          db.updateByQuery({
            index: 'dawnpen-posts',
            type: 'dawnpen-posts',
            body: {
              script: {
                lang: 'painless',
                inline: `ctx._source.last_update_date = "${date.toISOString()}";ctx._source.nb_replies += 1`
              },
              query: {
                match: {_id: post.parent}
              }
            }
          })

        }

        res.status(200).json({ id: response.body._id })
        return

      }

    }

    res.status(400).json({ error: "Bad request" })

  } else {

    res.status(404).json({ error: "Not found." })

  }

}
