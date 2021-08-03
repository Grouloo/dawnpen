import React from 'react'
import axios from 'axios'
import { Container, Row, Col } from 'react-bootstrap'
import { LineChart, BarChart, Bar, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

import BackofficeHeaderComponent from '../../src/components/BackofficeHeaderComponent'
import getStats from '../../src/functions/getStats'

const formatXAxis = date => {
  const cleanedDate_day = new Date(date).getDate();
  const cleanedDate_month = new Date(date).getMonth() + 1;
  const cleanedDate_year = new Date(date).getFullYear();

  return cleanedDate_day ? cleanedDate_day + '/' + cleanedDate_month + '/' + cleanedDate_year : date

}

export default class App extends React.Component {

  constructor(props){
    super(props)

    this.state = {}
  }

  async componentDidMount(){

    this.setState({ ...await getStats()})

  }

  render(){

    return(

      <Container>

        <BackofficeHeaderComponent page="statistics" language={this.props.language} />

        <Row>

          <Col>

            <h3 className="centered-text">{this.props.language.backoffice && this.props.language.backoffice.messages}</h3>

            <LineChart width={600} height={300} data={this.state.messagesByDate} className="centered-div">
              <Line type="monotone" dataKey="nb_messages" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="date" tickFormatter={formatXAxis} />
              <YAxis />
              <Tooltip />
            </LineChart>

          </Col>

        </Row>

        <Row>

          <Col>

          <h3 className="centered-text">{this.props.language.backoffice && this.props.language.backoffice.topics}</h3>

          <BarChart width={600} height={300} data={this.state.messagesByTopic} className="centered-div">
            <XAxis dataKey="topic" />
            <YAxis />
            <Bar dataKey="nb_messages" barSize={30} fill="#8884d8" />
          </BarChart>

          </Col>

        </Row>

      </Container>

    )

  }

}
