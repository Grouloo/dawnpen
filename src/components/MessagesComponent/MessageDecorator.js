/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import { Card } from 'react-bootstrap'
import Linkify from 'react-linkify'
import WidgetComponent from '../WidgetComponent'

/**
 * Displays the message
 * @property {String} profil_picture_url
 * @property {String} username
 * @property {String} date
 * @property {String} content
 * @property {String} url
 * @property {String} label
 */
export default class MessageDecorator extends React.Component {

  constructor(props){
    super(props)
  }

  render(){

    return(

      <Card className="message-card centered-div">
        <Card.Body>

          <Card.Title>
            <img src={this.props.profil_picture_url} alt="pp" className="message-profil-picture" />
            {this.props.username}
          </Card.Title>

          <Card.Subtitle className="mb-2 text-muted">
            {this.props.date}
          </Card.Subtitle>

          <Card.Text>

            <Linkify properties={ { target: '_blank', style: { color: 'blue' } } }>
              {this.props.content.split("\n").map((i,key) => {
                return <div key={key}>{i}</div>;
              })}
            </Linkify>

            <WidgetComponent url={this.props.media} />

          </Card.Text>

          <hr />

          <Link href={this.props.url} as={this.props.url} passHref>
            {this.props.label}
          </Link>

        </Card.Body>
      </Card>

    )

  }

}
