import elasticsearch from '@elastic/elasticsearch'
import fs from 'fs'
import path from 'path'

import isModerator from '../../src/functions/isModerator'

import JSONData from '../../src/assets/meta.json'

/**
 * THIS DOESN'T WORK YET, WE NEED TO FIND AN ALTERNATIVE SOLUTION
 * (editing the meta.json file is impossible)
 * @param {*} req
 * @param {*} res
 * @returns
 */
export default async function handler(req, res) {

  if (req.method === 'PUT') {

    const db = new elasticsearch.Client({ node: 'http://localhost:9200' })

    if(JSONData.openBackoffice || (await isModerator(req, res)) == true){

      if(req.body.key == 'name'){

        JSONData.name = req.body.text

      }else if(req.body.key == 'theme'){

        JSONData.theme = req.body.select

      }else if(req.body.key == 'openBackoffice'){

        JSONData.openBackoffice = req.body.select

      }

      //await fs.writeFile(path.resolve(__dirname, '../../src/assets/meta.json'), JSONData, (error) => console.log(error))

      res.status(200).json()


    }else{

      res.status(401).json({ error: 'Unauthorized'})

    }

    return

  }

}
