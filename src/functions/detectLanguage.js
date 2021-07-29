/**
 * Looking at the user's languages settings to display the correct texts
 * @param {Object} JSONData Language JSON
 * @returns
 */
exports.detectLanguage = function(JSONData){

  function language_switch(lang){

    switch (lang) {
      case 'fr':
        localStorage.setItem('dawnpen_language', 'fr');
        return  JSONData.fr;
        break;
      default:
        localStorage.setItem('dawnpen_language', 'en');
        return JSONData.en;
        break;
    }
  }

  if(process.browser){

    const storedSetting = localStorage.getItem('dawn_lang')

    if(!storedSetting){
      if (typeof navigator === `undefined`) {
        return JSONData.en;
      }

      const lang = navigator && navigator.language && navigator.language.split("-")[0];

      return language_switch(lang)

    }else{
      return language_switch(storedSetting)
    }

    //console.log(storedSetting)
  }

}
