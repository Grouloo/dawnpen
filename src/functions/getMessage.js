import axios from 'axios'

export default async function getMessage(props){

  const response = await axios.get(`/api/message/${props.topic}/${props._id}`)

  return response.data
}
