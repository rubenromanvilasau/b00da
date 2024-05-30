
const express = require('express');
const router = express.Router();

const MarketController = require('../controllers/market.controller');
const marketController = new MarketController();

router.get('/spread', marketController.getMarketSpread);

module.exports = router;