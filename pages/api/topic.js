import elasticsearch from '@elastic/elasticsearch'

import isModerator from '../../src/functions/isModerator'

import JSONData from '../../src/assets/meta.json'

export default async function handler(req, res) {

  if (req.method === 'POST') {

    const db = new elasticsearch.Client({ node: 'http://localhost:9200' })

    if(JSONData.openBackoffice || (await isModerator(req, res)) == true){

      //Converting name to proper ID
      var topic_id = req.body.text.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
      topic_id.replace(/\s+/g, '')
      topic_id = topic_id.toLowerCase()

      var topic = {
        name: req.body.text,
        id: topic_id,
        descr: req.body.textarea,
        creation_date: new Date()
      }

      const response = await db.index({
        index: 'dawnpen-topics',
        type: 'dawnpen-topics',
        body: topic
      })

      res.status(200).json()
      return

    }

    res.status(401).json({error: "Unauthorized."})
    return

  }

}
