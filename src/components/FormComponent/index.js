/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Row, Form, Card, Button } from 'react-bootstrap'

import WidgetComponent from '../WidgetComponent'

/**
 * Form generator
 * @property {Object} fields List of fields with their placeholder { [field]: [placeholder] ... }
 * @property {Object} values List of default values associated to the fields { [field]: [value] ... }
 * @property {Object} select Object containing all options and values for the select { [option]: [value], ... }
 * @property {Function} action Function to execute on submit
 * @property {Object} otherData Other data you want to use in the action
 */
export default class FormComponent extends React.Component {

  constructor(props){
    super(props)

    //Creating form ref
    this.ref = React.createRef()

    if(props.values){

      this.state = {
        border: 'primary',
        form_text: props.values.text,
        form_email: props.values.email,
        form_select: props.values.select,
        form_textarea: props.values.textarea,
      }

    }else{

      this.state = {border: 'primary'}

    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  handleInputChange(){

    const target = event.target;
    const value = target.name === 'rules_consent' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });

  }

  handleFileChange(){

    var file = event.target.files[0]
    var reader = new FileReader()
    var that = this

    reader.onload = async function(event) {

      that.setState({form_file: event.target.result})

    }

    reader.readAsDataURL(file)

  }

  handleSubmit(){

    event.preventDefault()

    const data = {
      text: this.state.form_text,
      email: this.state.form_email,
      password: this.state.form_password,
      select: this.state.form_select,
      textarea: this.state.form_textarea,
      file: this.state.form_file,
      ...this.props.otherData
    }

    this.props.action(data)

  }

  render(){

    return(

      <Row>
        <Form onSubmit={this.handleSubmit} className="centered-div">

          <Card ref={this.ref} border={this.state.border} className="form centered-div" style={{width: this.props.width || "50%"}}>
            <Card.Body>

              <Card.Title>

                {this.props.profil_picture_url && <img src={this.props.profil_picture_url} alt="pp" className="message-profil-picture" />}

                {
                  this.props.fields && this.props.fields.text &&
                  <input type="text" name="form_text" onChange={this.handleInputChange} placeholder={this.props.fields.text || "Text"} value={this.state.form_text} maxLength="50" className="form-input" />
                }

                {
                  this.props.fields && this.props.fields.email &&
                  <input type="email" name="form_email" onChange={this.handleInputChange} placeholder={this.props.fields.email || "Email"} value={this.state.form_email} maxLength="50" className="form-input" />
                }

                {
                  this.props.fields && this.props.fields.password &&
                  <input type="password" name="form_password" onChange={this.handleInputChange} placeholder={this.props.fields.password || "Password"} value={this.state.form_password} maxLength="50" className="form-input" />
                }

              </Card.Title>

              <Card.Subtitle className="mb-2 text-muted">

                {
                  this.props.fields && this.props.fields.label &&
                  <a>{this.props.fields.label}</a>
                }

                {
                  this.props.select &&
                  <Form.Control as="select" name="form_select" onChange={this.handleInputChange} className="form-select">

                    <option>{this.props.fields && this.props.fields.select || "Default"}</option>
                    {this.props.select.map((option, index) => {
                      console.log(option)
                      return(
                        <option key={index} value={Object.values(option)[0]}>
                          {Object.keys(option)[0]}
                        </option>
                      )
                    })}

                  </Form.Control>
                }


              </Card.Subtitle>

              <Card.Text>

                {
                  this.props.fields && this.props.fields.textarea &&
                  <textarea name="form_textarea" onChange={this.handleInputChange} placeholder={this.props.fields.textarea || "..."} value={this.state.form_textarea} className="form-textarea">
                  </textarea>
                }

                {
                  this.state.form_file &&
                  <WidgetComponent url={this.state.form_file} />
                }

              </Card.Text>

              <hr />


              {
                this.props.fields && this.props.fields.file &&
                <>
                  <label htmlFor="file-upload"className="btn btn-link">
                      {this.props.fields.file}
                  </label>
                  <input type={"file"} id='file-upload' onChange={this.handleFileChange} style={{display: 'none', width: 0}} />
                </>
              }

              <Button variant="primary" onClick={this.handleSubmit} className="form-submit">
                {this.props.fields && this.props.fields.submit || this.props.values && this.props.values.submit || "Submit"}
              </Button>

            </Card.Body>
          </Card>

        </Form>
      </Row>

    )
  }
}
