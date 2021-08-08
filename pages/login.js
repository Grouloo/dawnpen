import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import FormComponent from '../src/components/FormComponent'

import registerUser from '../src/functions/registerUser'
import loginUser from '../src/functions/loginUser'

export default class App extends React.Component {

  constructor(props){
    super(props)
  }

  render(){

    return(

      <Container>

        <Row>

          <Col className="centered-text" >

            <h1>{this.props.language.login && this.props.language.login.title}</h1>
            <hr className="short-hr" />

          </Col>

        </Row>

        <Row>

          <Col className="centered-text">

            <h3>{this.props.language.login && this.props.language.login.signin}</h3>

            <FormComponent
              fields={{
                text: this.props.language.login && this.props.language.login.username,
                email: this.props.language.login && this.props.language.login.email,
                password: this.props.language.login && this.props.language.login.password,
                confirm_password: this.props.language.login && this.props.language.login.confirm_password,
                submit: this.props.language.login && this.props.language.login.submit
              }}
              action={registerUser}
              language={this.props.language}
              width="75%"
            />

          </Col>

          <Col className="centered-text">

            <h3>{this.props.language.login && this.props.language.login.login}</h3>

            <FormComponent
              fields={{
                email: this.props.language.login && this.props.language.login.email,
                password: this.props.language.login && this.props.language.login.password,
                submit: this.props.language.login && this.props.language.login.submit,
              }}
              action={loginUser}
              language={this.props.language}
              width="75%"
            />

          </Col>

        </Row>

      </Container>

    )

  }

}
