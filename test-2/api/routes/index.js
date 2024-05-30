const express = require('express');
const router = express();

const marketRoutes = require('./market.routes');

router.use('/markets', marketRoutes);

module.exports = router;