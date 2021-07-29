import React from 'react'
import { useRouter } from 'next/router'
import { Container } from 'react-bootstrap'

import BackofficeHeaderComponent from '../../../src/components/BackofficeHeaderComponent'
import BackofficeComponent from '../../../src/components/BackofficeComponent'

import createElement from '../../../src/functions/createElement'
import deleteElement from '../../../src/functions/deleteElement'

const App = (props) => {

  const router = useRouter()

  if(router.isReady && props.language.backoffice){

    const { endpoint } = router.query

    var createForm = false
    var editForm = false
    var deleteAction = false


    switch(endpoint){

      case 'messages':
        deleteAction = {
          endpoint: '/api/message/default/',
          action: deleteElement
        }
        break

      case 'topics':
        createForm = {
          fields: {
            text: props.language.backoffice.name,
            textarea: props.language.backoffice.descr
          },
          action: createElement,
          otherData: {method: 'post', endpoint: '/api/topic'}
         }

        deleteAction = {
          endpoint: '/api/topic/',
          action: deleteElement
        }
        break

      case 'tickets':
        deleteAction = {
          endpoint: '/api/ticket/',
          action: deleteElement
        }
        break

      case 'moderators':
        createForm = {
          fields: {
            text: props.language.backoffice.name,
            email: props.language.backoffice.email,
            password: props.language.backoffice.password,
            select: props.language.backoffice.role,
          },
          select: [
            { [props.language.backoffice.moderator]: 'moderator' },
            { [props.language.backoffice.administrator]: 'administrator' }
          ],
          action: createElement,
          otherData: {method: 'post', endpoint: '/api/moderator'}
          }

          deleteAction = {
            endpoint: '/api/moderator/',
            action: deleteElement
          }
        break

    }

    return(

      <Container>

        <BackofficeHeaderComponent page={endpoint}  language={props.language} />

        <BackofficeComponent dataProvider={`/api/${endpoint}`} createForm={createForm} deleteAction={deleteAction}  language={props.language} />

      </Container>

    )

  }else{

    return(null)

  }
}

export default App
