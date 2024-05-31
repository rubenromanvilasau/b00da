
const express = require('express');
const router = express.Router();

const MarketController = require('../controllers/market.controller');
const marketController = new MarketController();

router.get('/spreads', marketController.getAllMarketsSpread);
router.get('/spread/changes', marketController.getSpreadChanges);
router.get('/:id/spread', marketController.getMarketSpread);

module.exports = router;