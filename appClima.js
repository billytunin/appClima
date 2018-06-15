const express = require('express');
const args = require('node-args');
const node_storage = require('node-storage');

const clima = require('./clima');
const minMaxUpdater = require('./minMaxUpdater');

const PORT = args.port || args.p || 3000;
const language = args.lang || args.l || 'es';
const storagePath = args.path || 'min_max';

const app = express();

// Empezar a medir el clima cada 1 minuto
minMaxUpdater.start(language, storagePath);

app.get('/', (req, res) => res.status(200).json({ data: 'Bienvenido a appClima' }) );

app.get('/climaActual', (req, res) => {
  clima.obtenerActual(language).then( (payload) => {
    res.status(200).json({ data: payload });
  }).catch( (error) => {
    res.status(500).json({ error: 'Hubo un problema en los servicios de Apixu' });
  });
});

app.get('/obtenerMinMax', (req, res) => {
  try {
    let storage = new node_storage(storagePath);
    let min_max_object = {
      min: storage.get('min'),
      max: storage.get('max')
    }
    res.status(200).json({ data: min_max_object });
  } catch (e) {
    res.status(500).json({ errorMessage: 'Ocurrió un problema al intentar obtener la minima y maxima temperatura', errorData: JSON.stringify(e) });
  }
});

app.listen( PORT, () => console.log(`appClima escuchando en el puerto ${PORT}`) );

