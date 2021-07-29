import React from 'react'
import { Row, Spinner } from 'react-bootstrap'

import getTopics from './getTopics.js'
import TopicButton from './TopicButton.js'

export default class App extends React.Component {

  constructor(props){
    super(props)

    this.state = {}
  }

  async componentDidMount(){

    this.setState({topics: await getTopics()})

  }

  render(){

    return(
      <Row>

        {this.state.topics && this.state.topics.map((topic, index) => {

          return(<TopicButton key={index} id={topic._source.id} name={topic._source.name} />)

        })}

        {!this.state.topics && <Spinner />}

      </Row>
    )

  }

}
