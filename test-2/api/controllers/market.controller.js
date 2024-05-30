const MarketService = require('../services/market.service');
const marketService = new MarketService();

class MarketController {

    async getMarketSpread(req, res) {
        try {
            const markets = await marketService.getAll();
            console.log('markets', markets);
            // await marketService.getSpread();
            res.send('hola');
        } catch (error) {
            console.log('error', error);
        }
    }
}


module.exports = MarketController;