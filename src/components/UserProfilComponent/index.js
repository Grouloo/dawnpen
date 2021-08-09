/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import getUser from '../../functions/getUser'

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

        {this.state.user &&

            <Card.Body>

              <Row noGutters>

                <Col style={{maxWidth: '128px'}}>
                  <img src={this.state.user._source.picture} className="user-profil-picture" />
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

      </Card>

    )

  }

}
