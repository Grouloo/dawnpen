import axios from "axios"

export default async function registerUser(data){

  if(data.text && data.email && data.password && data.confirm_password){

    if(data.password == data.confirm_password){

      const response = axios.post('/api/register', data)

      if(response.status == '200'){

        window.location.href = '/'

      }


    }else {

      return "passswords_must_match"

    }

  }else{

    return "complete_all_fields"

  }

}
