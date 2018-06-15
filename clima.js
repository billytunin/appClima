const request = require('request');
const constants = require('./constants');

module.exports = {
  obtenerActual: () => {
    return new Promise( (resolve, reject) => {
      let url = `${constants.apixu_url}current.json?key=${constants.apixu_token}&q=${encodeURIComponent('Buenos Aires')}`;
      request(url, (error, response, body) => {
        if (error) {
          reject(error);
          return;
        }
        let responseObject = JSON.parse(body);
        let object_to_return = {
          temperatura: responseObject.current.temp_c,
          humedad: responseObject.current.humidity,
          condicion: responseObject.current.condition.text
        }
        resolve(object_to_return);
      });
    })
  }
}