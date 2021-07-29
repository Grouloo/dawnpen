import axios from 'axios'

/**
 * Calls the API to create an element
 * @param {*} data
 * @returns
 */
export default async function createElement(data){

  const response = await axios.post(data.endpoint, data, { headers: {
    'Content-Type': 'application/json',
    'Authorization': data.access_token
  } })

  if(response.status == "200") window.location.reload(false)

  return

}
