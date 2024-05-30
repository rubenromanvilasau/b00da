const fetch = require('node-fetch');

class MarketService {
        
    constructor() {
            this.budaApiUrl = 'https://www.buda.com/api/v2/';
        }

    getAll() {
        return fetch(`${this.budaApiUrl}markets`)
            .then(response => response.json())
            .then(data => data)
            .catch(error => {
                console.error('Error:', error);
                throw error;
            });
    }


    getSpread(market) {
        fetch(`${this.budaApiUrl}markets`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

}

module.exports = MarketService;