import React from 'react'
import { useRouter } from 'next/router'
import { Container, Row, Col } from 'react-bootstrap'

import UserProfilComponent from '../../src/components/UserProfilComponent'

const App = (props) => {

  const router = useRouter()

  //Checking if the router is ready, to avoid undefined params
  if(router.isReady){

    const { userID } = router.query

    return(

      <Container>

        <Row className="centered-text">
          <h1>{props.language.user && props.language.user.title}</h1>
          <hr className="short-hr" />
        </Row>

        <Row>

          <Col>

            <UserProfilComponent userID={userID} />

          </Col>

          <Col>
          </Col>
        </Row>

      </Container>

    )

  }else{

    return null

  }

}

export default App
