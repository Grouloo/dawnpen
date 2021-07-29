import React from 'react'
import { useRouter } from 'next/router'
import { Container } from 'react-bootstrap'

import BackofficeHeaderComponent from '../../../../src/components/BackofficeHeaderComponent'
import BackofficeComponent from '../../../../src/components/BackofficeComponent'

const App = (props) => {

  const router = useRouter()

  if(router.isReady){

    const { page } = router.query

    return(

      <Container>

        <BackofficeHeaderComponent page="messages" language={props.language} />

        <BackofficeComponent dataProvider="/api/messages/technology" />

      </Container>

    )

  }else{

    return(null)

  }
}

export default App
