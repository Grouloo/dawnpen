import axios from 'axios'

export default async function editBio(data){

  const response = await axios.put('/api/edit-bio', data)

  if(response == '200'){

    window.location.reload(false)

  }

}
