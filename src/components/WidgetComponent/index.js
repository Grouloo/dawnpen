/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
//Imports
import React, { Component } from 'react'
import resources from './resources.json'
//import {Helmet} from "react-helmet";
//import { NFTE } from '@nfte/react';

export default class WidgetComponent extends React.Component {

  /**
   * Constructor
   * @param {*} props
   */
  constructor(props){
    super(props)

   if (this.props.url) this.resource = resources.data.find(element => this.props.url.includes(element.base_url));

    this.display_link = true;

    if(this.resource && this.resource.base_url){

      //Defining embed size
      if(!this.props.widescreen){

        switch(this.resource.force_widescreen){
          case false:
            this.size = '50%'
            break
          case true:
            this.size = '100%'
            break
        }

      }else{
        this.size = '100%'
      }

      //Formating the URL
     this.embed_url = this.resource.embed_url + this.props.url.replace(this.resource.part_to_remove, "")

    }

    //Defining max height
    this.maxHeight = (this.resource && this.resource.maxHeight) ? this.resource.maxHeight : 'auto'

    //Defining if the component should display a link to the resource
    if((this.resource && !this.resource.display_link) || this.props.doNotDisplayLink) this.display_link = false


  }

  /**
   * Render method
   */
  render(){

    return(

      <>

        {
          //Displaying embed
        }
        {this.embed_url && !this.resource.isImage && !this.props.url.includes('https://opensea.io/assets/') &&
          <p style={{position: 'relative', width: this.size, height: '0', paddingBottom: '28.125%', overflow: 'hidden', maxHeight: this.maxHeight}}>
            <iframe src={this.embed_url} style={{position: 'absolute', width: '100%', height: '100%', maxHeight: this.maxHeight}} frameBorder="0" allow="encrypted-media" allowFullScreen>
            </iframe>
          </p>
        }


        {
          //Displaying NFT
        }
        {/*this.props.url && this.props.url.includes('https://opensea.io/assets/') &&
          <>
            <nft-card
              contractAddress={this.props.url.replace('https://opensea.io/assets/', '').split('/')[0]}
              tokenId={this.props.url.replace('https://opensea.io/assets/', '').split('/')[1]}
              width='100%'
            >
            </nft-card>

            <Helmet>
              <script src="https://unpkg.com/embeddable-nfts/dist/nft-card.min.js"></script>
            </Helmet>
          </>
      */}

        {
          //Displaying img
        }
        {((this.resource && this.resource.isImage) || (this.props.url && this.props.url.includes('data:image'))) &&
          <p>
            <div className="hoverable">
              <img src={this.props.url} width={this.size || '50%'} height="auto" style={{maxHeight: '400px', objectPosition: '0', maxWidth: this.size,  objectFit: 'scale-down'}}/>
            </div>
          </p>
        }

    </>

    )


  }
}
