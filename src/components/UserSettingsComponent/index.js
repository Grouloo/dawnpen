/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import { Nav, Modal, Spinner, Button } from 'react-bootstrap'
import axios from 'axios'
import Cookies from 'universal-cookie';

import FormComponent from '../FormComponent'
import UserProfilComponent from '../UserProfilComponent';

import ChangeLocalUsernameComponent from './ChangeLocalUsernameComponent'

import ChangeLocalUsername from '../../functions/changeLocalUsername'

export default class UserSettingsComponent extends React.Component {

  constructor(props){
    super(props)

    this.state = {}

    this.logout = this.logout.bind(this)
  }

  async componentDidMount(){

    const response = await axios.get('/api/')

    if(response.status == '200'){

      this.setState({
        done: true,
        userID: response.data._id,
        username: response.data._source.username,
        picture: response.data._source.picture,
        logged: true
      })

    }else if(process.browser){

      this.setState({
        done: true,
        username: localStorage.getItem('dawnpen-username'),
        picture: 'https://dawn-app.com/api/profil_picture/default.png'
      })

    }

  }

  async logout(){

    //const cookies = new Cookies();

    //cookies.remove('dawnpen-signed-user-access-token', { path: '/api' });

    await axios.get('/logout')

    document.location.reload(false)

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

            {!this.state.logged && this.props.language && this.props.language.user_settings &&
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

            {this.state.logged &&
              <>

                <UserProfilComponent userID={this.state.userID} />

                <Link href={`/user/${this.state.userID}`} as={`/user/${this.state.userID}`} passHref>
                  {this.props.language.user && this.props.language.user.more_informations}
                </Link>

              </>
            }

          </Modal.Body>

          <Modal.Footer>

          <Button
            variant="danger"
            onClick={this.logout}>
            {this.props.language.user_settings && this.props.language.user_settings.logout}
          </Button>

          </Modal.Footer>

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
