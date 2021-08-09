import axios from 'axios'

export default async function getUser(userID){

  const response = await axios.get(`/api/user/${userID}`)

  if(response.status == '200'){

    return response.data

  }

}
