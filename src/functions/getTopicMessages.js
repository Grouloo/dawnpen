import axios from 'axios'

/**
 * Gets all the messages from a topic
 * @param {Object} props Props of the component
 * @returns {Array} Array of messages
 */
export default async function getTopicMessages(props){

  const response = await axios.get(`/api/messages/${props.topic}?from=${props.from || 0}`)

  return response.data

}
