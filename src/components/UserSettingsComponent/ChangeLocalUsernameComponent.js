import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

export default class ChangeLocalUsernameComponent extends React.Component {

  constructor(props){
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleInputChange(){

    const target = event.target;
    const value = target.name === 'rules_consent' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

  }

  handleSubmit(){

    event.preventDefault()



  }

  render(){

    return(

      <Row>

        <h4>{this.props.language.user_settings && this.props.language.user_settings.change_username}</h4>

        <Col>
          <input type="text" name="user-settings-username" onChange={this.handleChange} />
        </Col>

      <Col>
          <Button variant="primary" onClick={this.handleSubmit}>
            {this.props.language.user_settings && this.props.language.user_settings.submit}
          </Button>
      </Col>

      </Row>
    )

  }

}
