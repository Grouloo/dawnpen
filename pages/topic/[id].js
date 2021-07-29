import React from 'react'
import { useRouter } from 'next/router'
import { Container } from 'react-bootstrap'

import TopicHeaderComponent from '../../src/components/TopicHeaderComponent'
import FormComponent from '../../src/components/FormComponent'
import MessagesComponent from '../../src/components/MessagesComponent'


import postMessage from '../../src/functions/postMessage'
import getTopicMessages from '../../src/functions/getTopicMessages'

const App = (props) => {

  const router = useRouter()

  var topicRef = React.createRef()

  //Checking if the router is ready, to avoid undefined params
  if(router.isReady){

    const { id } = router.query

    const form_fields = {
      text: props.language.form.username,
      label: props.language.form.preview, //+ topicRef.state.topic._source.name,
      textarea: props.language.form.textarea_new_message,
      submit: props.language.form.submit
    }

    const form_values = {
      text: localStorage.getItem('dawnpen-username')
    }

    return(

      <Container>
        <TopicHeaderComponent id={id} ref={topicRef} title />
        <hr className="short-hr" />
        <FormComponent fields={form_fields} values={form_values} profil_picture_url={"https://dawn-app.com/api/profil_picture/default.png"} action={postMessage} otherData={{topic: id}}/>
        <hr className="short-hr" />
        <MessagesComponent dataProvider={getTopicMessages} topic={id} language={props.language}/>

      </Container>

    )

  }else{

    return null;

  }

}

export default App

