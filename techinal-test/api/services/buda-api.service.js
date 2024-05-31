const axios = require('axios');

class BudaApiServiceClass {

    constructor() {
        this.budaApiUrl = 'https://www.buda.com/api/v2/';
    }

    getMarkets() {
        return axios(`${this.budaApiUrl}markets`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.error('Error:', error);
                throw error;
            });
    }

    getMarketOrderBook(market) {
        return axios(`${this.budaApiUrl}markets/${market}/order_book`)
            .then( response => response.data)
            .catch(error => {
                console.error('Error:', error);
                throw error;
            });
    }
}

module.exports = BudaApiServiceClass;