import React from 'react'
import { Container, Row, Col  } from 'react-bootstrap'

import JSONData from '../package.json'

export default class App extends React.Component {

  constructor(props){
    super(props)
  }

  render(){

    return(

      <Container className="centered-text">

        <Row>
          <h1>{this.props.language.thanks && this.props.language.thanks.title}</h1>
          <hr className="short-hr" />
        </Row>

        <Row>
          <p>{this.props.language.thanks && this.props.language.thanks.descr}</p>
        </Row>

        <Row>
          <ul>
            {JSONData.dependencies && Object.entries(JSONData.dependencies).map((dependency, index) => {

              return <li key={index}>{dependency[0]}</li>

            })}
          </ul>
        </Row>

        <Row>
          <p>{this.props.language.thanks && this.props.language.thanks.dawnpen_devs}</p>
        </Row>

      </Container>

    )

  }

}
