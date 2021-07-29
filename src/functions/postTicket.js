import axios from 'axios'

/**
 * Sends the data from the contact form to the API
 * @param {Object} data
 */
export default async function postTicket(data){

  const body = {
    email: data.email,
    type: data.select,
    content: data.textarea
  }

  const response = await axios.post('/api/ticket', body)

  if(response.status == '200'){
    window.location.reload(false)
  }

  return

}
