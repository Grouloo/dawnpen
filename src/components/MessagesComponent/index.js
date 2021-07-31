import React from 'react'
import { Row, Spinner, Button } from 'react-bootstrap'

import MessageDecorator from './MessageDecorator'

/**
 * This component calls a dataProvider specified by the dev and a decorator for separation of concern (could be improved)
 * @property {Function} dataProvider
 * @property {Object} language
 */
export default class MessagesComponent extends React.Component {

  constructor(props){
    super(props)

    this.state = {from: 0}

    this.loadMore = this.loadMore.bind(this)
  }

  async componentDidMount(){

    this.setState({ messages: await this.props.dataProvider(this.props) })

  }

  /**
   * Load 10 more messages
  */
  async loadMore(){

    this.setState({
      from: this.state.from + 10,
      messages: this.state.messages.concat(this.props.dataProvider({ ...{from: this.state.from}, ...this.props })
      )
    })

  }

  render(){

    return(

      <Row>

        {this.state.messages && this.state.messages.map((message, index) => {

          //Formating date to be able to display it
          var date_to_format = this.props._id
            ? new Date(message._source.creation_date)
            : new Date(message._source.last_update_date)

          var cleanedDate_hour = date_to_format.getHours()
          var cleanedDate_minutes = date_to_format.getMinutes()

          if(cleanedDate_hour.toString().length == 1) cleanedDate_hour = "0" + cleanedDate_hour
          if(cleanedDate_minutes.toString().length == 1) cleanedDate_minutes = "0" + cleanedDate_minutes


          var cleanedDate_day = date_to_format.getDate()
          var cleanedDate_month = date_to_format.getMonth() + 1
          var cleanedDate_year = date_to_format.getFullYear()

          var date = `${cleanedDate_hour}:${cleanedDate_minutes} - ${cleanedDate_day}/${cleanedDate_month}/${cleanedDate_year}`

          //If we are on a message page, we don't display the link
          const label = this.props._id && this.props.language.message
            ? ""
            : `${this.props.language.message.label} (${message._source.nb_replies})`

          const url = this.props._id
            ? ""
            : `/message/${this.props.topic}/${message._id}`

          return(
            <MessageDecorator
              key={index}
              profil_picture_url={"https://dawn-app.com/api/profil_picture/default.png"}
              username={message._source.username}
              date={date}
              content={message._source.content}
              media={message._source.media}
              label={label}
              url={url}
            />
          )

        })}

        {
          //Load More button
        }
        {this.state.messages && this.state.messages.length % 10 == 0 &&
          <Button variant="light" onClick={() => this.loadMore} className="centered-div"></Button>
        }


        {!this.state.messages && <Spinner animation="border" className="centered-div" />}

      </Row>

    )

  }

}
