import axios from 'axios'

export default async function postMessage(data){

  const response = await axios.post('/api/message', data, { headers: { 'Content-type': 'application/json' } })

  if(response.status == '200'){

    if(data.parent){

      window.location.reload(false)

    }else{

      window.location.href = `/message/${response.data.topic}/${response.data.id}`

    }

    return

  }else if(response.status == '500'){

    return {error: 'Internal Server Error'}

  }else{

    return response.data.error

  }

}
