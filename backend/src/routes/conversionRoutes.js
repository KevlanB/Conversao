const express = require('express');
const router = express.Router();
const { getConversionTimeSeries } = require('../controllers/conversionController');

router.get('/', getConversionTimeSeries);

module.exports = router;