import axios from 'axios'

/**
 * This function call the API to get a precise topic
 * @param {String} id ID of the desired topic
 * @returns {Object} Topic
 */
export default async function getTopic(id){

  const response = await axios.get(`/api/topic/${id}`)

  return response.data
}
