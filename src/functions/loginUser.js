import axios from "axios"

export default async function loginUser(data){

  if(data.email && data.password){

    const response = await axios.post('/api/login', data)

    if(response.status == '200'){

      window.location.href = '/'

    }else{

      return response.data.message
    }

  }else{

    return "complete_all_fields"

  }

}
