const MarketService = require('../services/market.service');
const marketService = new MarketService();

class MarketController {

    async getMarketSpread(req, res) {
        const { id } = req.params;

        if(!id) return res.status(400).send({ message: 'Market id is required' });
        
        try {
            const { markets } = await marketService.getAll();
            const market = markets.find( market => market.id.toUpperCase() === id.toUpperCase());
            
            if(!market) {
                return res.status(404).send({message: `Market with id '${id}' doesn't exist`});
            }

            const spread = await marketService.getSpread(id);
            res.status(200).send({
                market,
                spread
            });
        } catch (error) {
            console.log('[MarketController] getMarketSpread error', error);
            return res.status(500).send({ message: 'Internal server error' });
        }
    }

    async getAllMarketsSpread(req, res) {
        try {
            const spreads = await marketService.getAllSpreads();
            res.status(200).send(spreads);
        } catch (error) {
            console.log('[MarketController] getAllMarketsSpread error', error)
            res.status(500).send({message: 'Internal server error'});
        }
    }

    //Currently working only for BTC-CLP Market.
    async getSpreadChanges(req, res) {
        try {
            const pollingData = marketService.getSpreadChanges();
            res.status(200).send(pollingData);
        } catch (error) {
            console.log('[MarketController] getSpreadChanges error', error);
            return res.status(500).send({ message: 'Internal server error' });
        }
    }
}


module.exports = MarketController;