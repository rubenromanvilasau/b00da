const BudaApiService = require('./buda-api.service');
const budaApiService = new BudaApiService();

class MarketService {
    pollingMarketId = 'btc-clp'; //Market to poll
    pollingInterval = 60*1000; //1 Minute
    pollingData = {
        currentSpread: 0,
        lastSpread: 0,
        market: {}
    };

    constructor() {
        setInterval(() => this.#updateSpreadChanges(this.pollingMarketId), this.pollingInterval)
    }
    
    /**
     * Get all available markets in Buda API
     * @returns {Promise<object>} - All markets
     */
    getAll() {
        return budaApiService.getMarkets();
    }
   
    /**
     * Calculate the spread of an especific market
     * @param {string} marketId - Market id 
     * @returns {Promise<object>} - Spread of the market
     */
    async getSpread(marketId) {
        marketId = marketId.toLowerCase();

        const { order_book } = await budaApiService.getMarketOrderBook(marketId);
        
        let biggestBidOrder = this.#getBiggestOrder(order_book.bids);
        let smallestAskOrder = this.#getSmallestOrder(order_book.asks);

        const spread = smallestAskOrder[0] - biggestBidOrder[0];

        return spread;
    }

    /**
     * Get the spread of all markets
     * @returns {Promise<Array{}>} - All markets with their respective spread
     */
    async getAllSpreads() {

       try {
            const { markets } = await this.getAll()

            const spreads = await Promise.all(markets.map( async market => {
                const spread = await this.getSpread(market.id);
                return {
                    market,
                    spread: spread
                }
            }));

            return spreads;
       } catch (error) {
              console.error('Error:', error);
              throw error;
       }
    }

    getSpreadChanges() {
        return this.pollingData;
    }

    //For polling service
    async #updateSpreadChanges(marketId) {
        marketId = marketId.toLowerCase();
        try {
            const spreads = await this.getSpread(marketId);

            this.pollingData.market = marketId;
            this.pollingData.lastSpread = this.pollingData.currentSpread;
            this.pollingData.currentSpread = spreads;

            console.log('pollingData', this.pollingData);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    #getBiggestOrder(bids) {
        if(bids.length === 0) return new Array(2).fill(0);

        let biggestOrder = bids[0].map( order => Number(order));
        for(let i = 0; i < bids.length; i++){
            const currentOrder = bids[i].map( order => Number(order));

            if(currentOrder[0] > biggestOrder[0]){
                biggestOrder = currentOrder;
            }
        }
        return biggestOrder;
    }

    #getSmallestOrder(asks) {
        if(asks.length === 0) return new Array(2).fill(0);
        
        let smallestOrder = asks[0].map( order => Number(order));
        for(let i = 0; i < asks.length; i++){
            const currentOrder = asks[i].map( order => Number(order));
            if(currentOrder[0] < smallestOrder[0]){
                smallestOrder = currentOrder;
            }
        }
        return smallestOrder;
    }

}

module.exports = MarketService;