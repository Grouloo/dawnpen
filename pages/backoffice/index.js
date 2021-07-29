import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import BackofficeHeaderComponent from '../../src/components/BackofficeHeaderComponent'
import FormComponent from '../../src/components/FormComponent'

import editInstance from '../../src/functions/editInstance'

import JSONData from '../../src/assets/meta.json'

export default class App extends React.Component {

  constructor(props){
    super(props)
  }

  render(){

    return(

      <Container>

        <BackofficeHeaderComponent page="index" language={this.props.language} />

        {this.props.language.backoffice &&

          <Row>

            <h5 className="centered-text" >{this.props.language.backoffice.name}</h5>

            <FormComponent
              fields={ {
                text: this.props.language.backoffice.name,
                submit: this.props.language.backoffice.submit
              } }
              values={ {
                text: JSONData.name
              } }
              action={editInstance}
              otherData={ { key: "name" } }
            />

            <br />

            <h5 className="centered-text" >{this.props.language.backoffice.theme}</h5>

            <FormComponent
              fields={ {
                select: this.props.language.backoffice.theme,
                submit: this.props.language.backoffice.submit
              } }
              values={ {
                select: JSONData.theme
              } }
              select={ [
                {"raw": "raw"},
                {"dawn": "dawn"}
              ] }
              action={editInstance}
              otherData={ { key: "select" } }
            />

          </Row>
        }

      </Container>

    )
  }
}
