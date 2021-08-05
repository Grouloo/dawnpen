import React from 'react'
import Head from 'next/head'
import { Container } from 'react-bootstrap'

import FormComponent from '../src/components/FormComponent'
import MessagesComponent from '../src/components/MessagesComponent'

import getTopicMessages from '../src/functions/getTopicMessages'
import postMessage from '../src/functions/postMessage'
import getTopics from '../src/components/TopicComponent/getTopics'

export default class App extends React.Component {

  constructor(props){
    super(props)

    this.state = {}
  }

  async componentDidMount(){

    const topics =  await getTopics()
    var select_topics = []

    topics.map((topic, index) => {

      select_topics.push({
        [topic._source.name]: topic._source.id
      })

    })

    this.setState({topics: select_topics})
  }

  render(){

    const form_fields = {
      text: this.props.language.form && this.props.language.form.username,
      label: this.props.language.form && this.props.language.form.preview, //+ topicRef.state.topic._source.name,
      select: "----",
      textarea: this.props.language.form && this.props.language.form.textarea_new_message,
      file: this.props.language.form && this.props.language.form.file,
      submit: this.props.language.form && this.props.language.form.submit
    }

    var form_values

    if(process.browser){

      form_values = {
        text: localStorage.getItem('dawnpen-username')
      }

    }

    return (

      <Container>

        <br />

        <FormComponent
          fields={form_fields}
          values={form_values}
          select={this.state.topics}
          profil_picture_url={"https://dawn-app.com/api/profil_picture/default.png"}
          action={postMessage}
        />

        <hr className="short-hr" />

        <MessagesComponent dataProvider={getTopicMessages} language={this.props.language}/>

      </Container>

    )

  }

}
