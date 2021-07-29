import React from 'react'
import { Row, Col, Table, Modal, Button, Spinner } from 'react-bootstrap'

import FormComponent from '../FormComponent'

import dataProvider from './dataProvider'

export default class App extends React.Component {

  constructor(props){
    super(props)

    this.state = {}
  }

  async componentDidMount(){

    this.setState({data: await dataProvider(this.props.dataProvider, this.props.access_token)})

  }

  render(){


      return(

        <Row>
          <Col>

          {this.props.createForm &&
            <>

              <Modal show={this.state.modalCreateForm} onHide={() => this.setState({modalCreateForm: false})}>

                <Modal.Header closeButton>
                </Modal.Header>

                <Modal.Body>

                  <FormComponent
                    fields={this.props.createForm.fields}
                    select={this.props.createForm.select}
                    action={this.props.createForm.action}
                    otherData={this.props.createForm.otherData}
                    width="100%"
                  />

                </Modal.Body>
              </Modal>


              <Button variant="primary" onClick={() => this.setState({modalCreateForm: true})}>
                {this.props.language.backoffice && this.props.language.backoffice.create}
              </Button>

            </>
          }

          {this.state.data && this.state.data.length > 0 &&

            <Table striped bordered hover responsive>

              <thead>

                <th>_id</th>

                {Object.keys(this.state.data[0]._source).map((key, index) => {

                  return <th key={index}>{key}</th>

                })}

              </thead>

              <tbody>

                {this.state.data.map((row, index) => {

                  return(

                    <tr key={index}>

                      <th>{row._id}</th>

                      {Object.values(row._source).map((value, index) => {

                        return <th key={index}>{value}</th>

                      })}

                      {this.props.deleteAction &&
                        <th>
                          <Button
                            variant="danger"
                            onClick={
                                () => this.props.deleteAction.action({
                                _id: row._id,
                                access_token: this.props.deleteAction.access_token
                              }, this.props.deleteAction.endpoint)
                            }
                          >
                            {this.props.language.backoffice.delete}
                          </Button>
                        </th>
                      }

                    </tr>

                  )

                })}

              </tbody>

            </Table>

          }

          {!this.state.data && <Spinner animation="border" /> }

          </Col>
        </Row>

      )

  }

}
