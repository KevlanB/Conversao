const express = require('express');
const conversionRoutes = require('./routes/conversionRoutes');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // URL do seu frontend
    credentials: true
  }));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/time-series', conversionRoutes);

app.use(errorHandler); // Adiciona o middleware de erro

module.exports = app;