/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import { Navbar, Nav } from 'react-bootstrap'


import UserSettingsComponent from '../UserSettingsComponent'

/**
 * This component displays the Header/Navbar
 * @property {Object} language Object containing all language elements
 */
export default class HeaderComponent extends React.Component {

  constructor(props){
    super(props)
  }

  render(){

    return(

      <Navbar bg="dark" variant="dark" expand="lg">

        <Nav>
          <Link href="/"><a className="nav-link">{this.props.language.navbar && this.props.language.navbar.home}</a></Link>
          <Link href="/explore"><a className="nav-link">{this.props.language.navbar && this.props.language.navbar.explore}</a></Link>
          {/*
            <Link href="/"><a className="nav-link">{this.props.language.navbar && this.props.language.navbar.favs}</a></Link>
          */}
        </Nav>

        <UserSettingsComponent language={this.props.language} />

      </Navbar>

    )
  }
}
