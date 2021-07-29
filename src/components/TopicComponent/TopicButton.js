import React from 'react'
import Link from 'next/link'
import { Col, Button } from 'react-bootstrap'

/**
 * Topic button decorator
 */
export default class App extends React.Component {

  constructor(props){
    super(props)
  }

  render(){

    return(

      <Col className="text-center">
        <Link href={`/topic/${this.props.id}`} as={`/topic/${this.props.id}`} className="centered-div" passHref>
          <Button bsPrefix="btn btn-outline-primary btn-lg topic-btn" variant="outline-primary" size='lg'>{this.props.name}</Button>
        </Link>
      </Col>

    )

  }

}
