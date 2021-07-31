import elasticsearch from '@elastic/elasticsearch'

export default async function processMedia(file){

  const db = new elasticsearch.Client({ node: 'http://localhost:9200' })

  if(
    file.includes('data:image/jpeg;base64')
    || file.includes('data:image/png;base64')
    || file.includes('data:image/gif;base64')
  ){

    var extension

    if(file.includes('image/jpeg')){
      extension = "jpg"
    }else if(file.includes('image/gif')){
      extension = ".gif"
    }else{
      extension = "png"
    }

    var img = {base64: file, extension: extension}

    const response = await db.index({
      index: 'dawnpen-img',
      type: 'dawnpen-img',
      body: img
    })

    return `/api/img/${response.body._id}.${extension}`

  }else{

    return null;

  }

}
