const express = require('express');
const args = require('node-args');
const cron = require('node-cron');
const dictionary = require('./dictionary');

const clima = require('./clima');

const PORT = args.port || args.p || 3000;
const language = args.lang || args.l || 'esp';

const app = express();

app.get('/', (req, res) => res.status(200).json({ data: 'Bienvenido a appClima' }) );

app.get('/climaActual', (req, res) => {
  clima.obtenerActual().then( (response) => {
    let payload = response;
    res.status(200).json({ data: payload });
  } );
});

app.listen( PORT, () => console.log(`appClima listening on port ${PORT}`) );

