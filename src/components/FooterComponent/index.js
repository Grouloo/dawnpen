/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import { Container, Row, Col } from 'react-bootstrap'

import meta from '../../assets/meta.json'

/**
 * This component displays the Footer
 * @property {Object} language Object containing all language elements
 */
export default class HeaderComponent extends React.Component {

  constructor(props){
    super(props)
  }

  render(){

    return(
      <div style={{marginBottom: '70px'}}>
        <Container>
          <Col></Col>

          <Col>
            <footer className="pt-4 my-md-5 pt-md-5 border-top">

              <Row>

                {
                  //Logo
                }
                <Col>
                  <div className="hoverable">
                    <img style={{maxWidth: '75%'}} src="/banner.png"/>
                  </div>
                  <p>
                    {this.props.language.footer && this.props.language.footer.powered_by}
                    <a href="https://github.com/Grouloo/dawnpen">DAWNPEN</a>
                    <br/>
                    {/*
                      <a href="https://twitter.com/DAWNAPP_FR" target="_blank">Twitter</a>
                      &nbsp;
                      &middot;
                      &nbsp;
                      <a href="https://www.instagram.com/dawnapp_fr/" target="_blank">Instagram</a>
                      &nbsp;
                      &middot;
                      &nbsp;
                      <a href="https://discord.gg/7wz9qJ3mAh" target="_blank">Discord</a>
                    */}
                  </p>
                </Col>

                {
                  //Navbar
                }
                <Col>

                  <Row>

                    <Col>
                      <Row>
                        <h3>{this.props.language.footer && this.props.language.footer.title}</h3>
                      </Row>
                      <p><Link href="/"><a>{this.props.language.navbar && this.props.language.navbar.home}</a></Link></p>
                      <p><Link href="/explore"><a>{this.props.language.navbar && this.props.language.navbar.explore}</a></Link></p>
                    </Col>

                    {
                    //Ressources
                    }
                    <Col>
                      <Row>
                        <h3>{this.props.language.footer && this.props.language.footer.resources}</h3>
                      </Row>

                      {/*
                        <p><Link href="/faq"><a>{this.props.language.footer && this.props.language.footer.faq}</a></Link></p>
                      <p><Link href="/rules"><a>{this.props.language.footer && this.props.language.footer.rules}</a></Link></p>
                      */}
                      <p><Link href="/thanks"><a>{this.props.language.footer && this.props.language.footer.thanks}</a></Link></p>
                    </Col>

                    {
                      //Contact
                    }
                    <Col>
                      <Row>
                        <h3>{meta.name}</h3>
                      </Row>

                      <p><Link href="/contact"><a>{this.props.language.footer && this.props.language.footer.contact}</a></Link></p>
                    </Col>

                  </Row>
                </Col>

              </Row>

            </footer>
          </Col>

          <Col></Col>
        </Container>
      </div>
    )
  }
}
