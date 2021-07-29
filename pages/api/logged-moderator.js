import isModerator from '../../src/functions/isModerator'

import JSONData from '../../src/assets/meta.json'

export default async function handler(req, res) {

  if(JSONData.openBackoffice || (await isModerator(req, res)) == true){

    res.status(200).json()
    return

  }

  res.status(401).json({error: "Unauthorized."})
  return

}
