import axios from 'axios'

export default async function getStats(){

  var messagesByDate = []
  var messagesByTopic = []

  const response = await axios.get(`/api/messages`)

  response.data.map((message, index) => {

    var inserted_date = false
    var inserted_topic = false

    //Messages by dates
    messagesByDate.map((entry, i) => {


      if( (new Date(entry.date)).toDateString() === (new Date(message._source.creation_date)).toDateString() ){

        entry.nb_messages += 1
        inserted_date = true

      }

    })

    if(message._source.creation_date && inserted_date == false){

      messagesByDate.push({date: message._source.creation_date, nb_messages: 1})

    }

    //Messages by Topics
    messagesByTopic.map((entry, i) => {


      if( entry.topic === message._source.topic ){

        entry.nb_messages += 1
        inserted_topic = true

      }

    })

    if(message._source.topic && inserted_topic == false){

      messagesByTopic.push({topic: message._source.topic, nb_messages: 1})

    }

  })

  //Sorting array
  messagesByDate.sort((a, b) => {
    return new Date(a.date) - new Date(b.date)
  })

  return {messagesByDate: messagesByDate, messagesByTopic: messagesByTopic}

}
