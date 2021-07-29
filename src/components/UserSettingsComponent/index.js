/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Nav, Modal, Spinner } from 'react-bootstrap'

import FormComponent from '../FormComponent'

import ChangeLocalUsernameComponent from './ChangeLocalUsernameComponent'

import ChangeLocalUsername from '../../functions/changeLocalUsername'

export default class UserSettingsComponent extends React.Component {

  constructor(props){
    super(props)

    this.state = {}
  }

  componentDidMount(){

    if(process.browser){
      this.setState({
        done: true,
        username: localStorage.getItem('dawnpen-username'),
        picture: 'https://dawn-app.com/api/profil_picture/default.png'
      })
    }

  }

  render(){

    return(

      <>

        <Modal show={this.state.show} onHide={() => this.setState({ show: false })}>

          <Modal.Header closeButton>
            <Modal.Title>{this.props.language.user_settings && this.props.language.user_settings.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {/*<ChangeLocalUsernameComponent language={this.props.language} />*/}

            {this.props.language && this.props.language.user_settings &&
              <FormComponent
                fields={ {
                  text: this.props.language.user_settings.change_username,
                  submit: this.props.language.user_settings.submit
                } }
                values={ {
                  text: this.state.username
                } }
                action={ChangeLocalUsername}
                width="100%"
              />
            }
          </Modal.Body>

        </Modal>

        <Nav className="user-settings-btn">

          <Nav.Link style={{color: "#ecf0f1"}} onClick={() => this.setState({ show: true })}>
            {this.state.picture && <a><img src={this.state.picture} className="message-profil-picture" /></a>}
            {this.state.username}
            {!this.state.done && <Spinner animation="border" />}
            <a>        </a>
            {this.state.done && <i className="settings-wheel" />}
          </Nav.Link>

        </Nav>

      </>

    )

  }

}
