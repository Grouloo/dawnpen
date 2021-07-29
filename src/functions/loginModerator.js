import axios from 'axios'

export default async function loginModerator(data){

  const response = await axios.post('/api/login-moderator', data)

  if(response.status === '200'){

      localStorage.setItem('dawnpen-moderator-access-token', response.data.access_token)

      window.location.reload(false)

  }else{

    return response.data

  }

}
