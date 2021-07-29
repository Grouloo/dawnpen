import axios from 'axios'

/**
 * Call the API to get the topics
 * @returns {Array} Topics
 */
export default async function getTopics(){

  const response = await axios.get(`/api/topics`)

  return response.data
}
