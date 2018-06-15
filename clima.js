const request = require('request');
const constants = require('./constants');
const _ = require('underscore');

module.exports = {
  obtenerActual: (lang) => {
    return new Promise( (resolve, reject) => {
      let url = `${constants.apixu_url}current.json?key=${constants.apixu_token}&q=${encodeURIComponent('Buenos Aires')}`;
      request(url, (error, response, body) => {
        if (error) {
          reject(error);
          return;
        }
        let responseObject = JSON.parse(body);
        resolve(responseObject);
      });
    }).then( (response) => {
      return buildTranslatedResponse(response, lang);
    }).catch( (error) => { throw error; });
  }
}

function buildTranslatedResponse(payload, lang){
  return new Promise( (resolve, reject) => {
    let responseObject = {
      temperatura: payload.current.temp_c,
      humedad: payload.current.humidity,
      condicion: payload.current.condition.text
    }
    if ( lang === 'en' ) {
      resolve(responseObject);
      return;
    }

    request({ uri: constants.apixu_translated_conditions_url, encoding: 'utf8' }, (error, response, body) => {
      if ( error ) {
        reject(error);
        return;
      }
      let translationsArray = JSON.parse(body);
      let conditionObject = _.find(translationsArray, (object) => object.code === payload.current.condition.code);
      let conditionLanguage = _.find(conditionObject.languages, (object) => object.lang_iso === lang);
      responseObject.condicion = payload.current.is_day ? conditionLanguage.day_text : conditionLanguage.night_text;

      resolve( responseObject );
    });


  } );
}