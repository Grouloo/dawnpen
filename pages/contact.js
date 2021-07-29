import React from 'react'
import { Container, Row } from 'react-bootstrap'

import FormComponent from '../src/components/FormComponent'

import postTicket from '../src/functions/postTicket'

export default class App extends React.Component {

  constructor(props){
    super(props)
  }

  render(){

    return(

      <Container>

        <Row className="centered-text">
          <h1>{this.props.language.contact && this.props.language.contact.title}</h1>
        </Row>

        <hr className="short-hr" />

        <Row>
          {this.props.language.contact &&
            <FormComponent
              fields={ {
                email: this.props.language.contact.email,
                select: "----",
                textarea: this.props.language.contact.textarea
              } }
              select={ this.props.language.contact.options }
              action={postTicket}
            />
          }
        </Row>

      </Container>

    )

  }

}
