import axios from 'axios'

/**
 * Calls the API to delete an element
 * @param {*} data
 * @param {String} endpoint
 * @returns
 */
export default async function deleteElement(data, endpoint){

  const response = await axios.delete(`${endpoint}${data._id}`, { headers: {
    'Content-Type': 'application/json',
    'Authorization': data.access_token
  } })

  if(response.status == "200") window.location.reload(false)

  return

}
