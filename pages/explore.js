import React from 'react'
import { Container, Row } from 'react-bootstrap'

import TopicComponent from '../src/components/TopicComponent'

export default class App extends React.Component {

  constructor(props){
    super(props)
  }

  render(){
    return(
      <Container>

        <Row>
          <div className="centered-text">
            <h1>{this.props.language.explore && this.props.language.explore.title}</h1>
            <h4>{this.props.language.explore && this.props.language.explore.descr}</h4>
          </div>
        </Row>

        <hr className="short-hr" />

        <TopicComponent />

      </Container>
    )
  }
}
