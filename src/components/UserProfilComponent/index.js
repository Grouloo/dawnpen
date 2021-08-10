/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'

import FormComponent from '../FormComponent'

import getUser from '../../functions/getUser'
import editBio from '../../functions/editBio'

export default class UserProfilComponent extends React.Component {

  constructor(props){
    super(props)

    this.state = {}
  }

  async componentDidMount(){

    this.setState({ user: await getUser(this.props.userID) })

  }

  render(){

    return(

      <Card>

        {this.state.user && !this.props.logged &&

            <Card.Body>

              <Row noGutters>

                <Col style={{maxWidth: '128px'}}>
                  <img src={`/api/profil-picture/${this.state.user._id}`} className="user-profil-picture" />
                </Col>

                <Col>
                  <h3>{this.state.user._source.username}</h3>

                  <Card.Text>

                    {this.state.user._source.bio}

                  </Card.Text>
                </Col>

              </Row>

            </Card.Body>


        }

        {this.state.user && this.props.logged &&

          <Card.Body>

            <Row noGutters>

              <Col style={{maxWidth: '128px'}}>
                <img src={`/api/profil-picture/${this.state.user._id}`} className="user-profil-picture" />
              </Col>

              <Col>
                <h3>{this.state.user._source.username}</h3>

                <FormComponent
                  fields={{
                    textarea: '...',
                    submit: this.props.language.user && this.props.language.user.submit
                  }}
                  values={{
                    textarea: this.state.user._source.bio
                  }}
                  action={editBio}
                />
              </Col>

            </Row>

          </Card.Body>


        }

      </Card>

    )

  }

}
