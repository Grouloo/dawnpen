import React from 'react'
import axios from 'axios'

import { Row, Col, Nav, Modal } from 'react-bootstrap'

import FormComponent from '../FormComponent'
import loginModerator from '../../functions/loginModerator'

export default class BackofficeHeaderComponent extends React.Component {

  constructor(props){
    super(props)

    this.state = {}
  }

  async componentDidMount(){

    try{

      const response = await axios.get(
        '/api/logged-moderator',
        { headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('moderator-access_token')
        } }
      )

    }catch(e){

      this.setState({showLoginModal: true})

    }

  }

  render(){

    return(

      <Row className="centered-text">

        <Modal show={this.state.showLoginModal}>

          <Modal.Header>
            <Modal.Title>
              {this.props.language.backoffice && this.props.language.backoffice.login}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>

          {this.props.language.backoffice &&
            <FormComponent
              fields={ {
                email: this.props.language.backoffice.email,
                password: this.props.language.backoffice.password
              } }
              action={loginModerator}
              width="100%"
            />
          }

          </Modal.Body>
        </Modal>

        <Col>

          <h1>{this.props.language.backoffice && this.props.language.backoffice.title}</h1>
          <h4>{this.props.language.backoffice && this.props.language.backoffice[this.props.page]}</h4>

          <Nav className="justify-content-center">

            <Nav.Item>
              <Nav.Link href="/backoffice/">
                {this.props.language.backoffice && this.props.language.backoffice.index}
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href="/backoffice/tables/messages">
                {this.props.language.backoffice && this.props.language.backoffice.messages}
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href="/backoffice/tables/topics">
                {this.props.language.backoffice && this.props.language.backoffice.topics}
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href="/backoffice/tables/tickets">
                {this.props.language.backoffice && this.props.language.backoffice.tickets}
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link href="/backoffice/tables/moderators">
                {this.props.language.backoffice && this.props.language.backoffice.moderators}
              </Nav.Link>
            </Nav.Item>

          </Nav>

          <hr className="short-hr" />


        </Col>

      </Row>

    )
  }
}
