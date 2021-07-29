import React from 'react'
import { useRouter } from 'next/router'
import { Container } from 'react-bootstrap'

import TopicHeaderComponent from '../../../src/components/TopicHeaderComponent'
import MessagesComponent from '../../../src/components/MessagesComponent'
import FormComponent from '../../../src/components/FormComponent'

import getMessage from '../../../src/functions/getMessage'
import postMessage from '../../../src/functions/postMessage'

const App = (props) => {

  const router = useRouter()

  var topicRef = React.createRef()

  if(router.isReady){

    const { topic, id } = router.query

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
        <TopicHeaderComponent id={topic} ref={topicRef} link />
        <hr className="short-hr" />
        <MessagesComponent dataProvider={getMessage} topic={topic} _id={id} language={props.language} />
        <hr className="short-hr" />
        <FormComponent
          fields={form_fields}
          values={form_values}
          profil_picture_url={"https://dawn-app.com/api/profil_picture/default.png"}
          action={postMessage}
          otherData={{topic: topic, parent: id}}
        />
      </Container>

    )

  }else{

    return null

  }

}

export default App
