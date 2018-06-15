const express = require('express');
const args = require('node-args');

const clima = require('./clima');

const PORT = args.port || args.p || 3000;
const language = args.lang || args.l || 'es';

const app = express();

app.get('/', (req, res) => res.status(200).json({ data: 'Bienvenido a appClima' }) );

app.get('/climaActual', (req, res) => {
  clima.obtenerActual(language).then( (response) => {
    let payload = response;
    res.status(200).json({ data: payload });
  }).catch( (error) => {
    res.status(500).json({ error: 'Hubo un problema en los servicios de Apixu' });
  });
});

app.get('/obtenerMinMax', (req, res) => {
  
});

app.listen( PORT, () => console.log(`appClima escuchando en el puerto ${PORT}`) );

