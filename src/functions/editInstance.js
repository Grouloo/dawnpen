import axios from 'axios'

export default async function editInstance(data){

  const response = axios.put('/api/instance', data)

  if(response.status == "200") window.location.reload(false)

}
