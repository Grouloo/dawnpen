import React from 'react'
import Link from 'next/link'
import { Row, Col, Button } from 'react-bootstrap'

import getTopic from './getTopic'


export default class TopicHeaderComponent extends React.Component {

  constructor(props){
    super(props)

    this.state = {}
  }

  async componentDidMount(){

    if(this.props.id) this.setState({topic: await getTopic(this.props.id)})

  }

  render(){

    return(

      <Row className="centered-text">
        <div className="centered-text">
          <h1>{this.state.topic && this.state.topic._source.name}</h1>
          <h4>{this.state.topic && this.state.topic._source.descr}</h4>
        </div>

        {this.props.link && this.state.topic &&
          <>

            <Col>
              <Link
                href={`/topic/${this.state.topic._source.id}`}
                as={`/topic/${this.state.topic._source.id}`}
                passHref
              >
                <Button variant="secondary" className="centered-div">
                  {`< ${this.state.topic._source.name}`}
                </Button>
              </Link>
            </Col>

            <Col></Col>

            <Col></Col>

          </>
        }
      </Row>
    )

  }
}
