//import '../styles/globals.css'
import Head from 'next/head'

import detectLanguage from '../src/functions/detectLanguage.js'

import HeaderComponent from '../src/components/HeaderComponent'
import FooterComponent from '../src/components/FooterComponent'


//Language Pack Importation
import JSONData from '../src/assets/language.json'

//Calling the function which will allow us to detect the user's navigator language
const language = { ...detectLanguage.detectLanguage(JSONData), ...JSONData.__ }


function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <link href="/style.css" rel="stylesheet"/>
      <link href="/themes/raw/style.css" rel="stylesheet"/>
      <link href="/themes/raw/icons.css" rel="stylesheet"/>

      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
    </Head>

    <HeaderComponent language={language} />

    <Component {...pageProps} language={language}/>

    <FooterComponent language={language} />
    </>
  )
}

export default MyApp
