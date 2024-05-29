
const startDateThisYear = 1709305200000; // 01/03/2024 12:00pm
const startDateLastYear = 1677682800000; // 01/03/2023 12:00pm

const timestampThisYear = 1709308800000; // 01/03/2024 1:00pm
const timestampLastYear = 1677686400000; // 01/03/2023 1:00pm

const urlThisYear = `https://www.buda.com/api/v2/markets/BTC-CLP/trades?timestamp=${timestampThisYear}&limit=100`;
const urlLastYear = `https://www.buda.com/api/v2/markets/BTC-CLP/trades?timestamp=${timestampLastYear}&limit=100`;

const fetchLastYearTrades = () => {
    return fetch(urlLastYear)
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error));
}

const fetchThisYearTrades = () => {
    return fetch(urlThisYear)
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error));
}

const convertToClp = (num) => {
    return num.toLocaleString('es-CL', { style: 'currency', currency: 'CLP'});
}


/**
 * Un factor importante a considerar en las respuestas es que la API limita la cantidad de trades que se pueden obtener a máximo 100 por request.
 * por lo que los resultados están basados en lo anterior.
 */
async function main(){

    const [thisYearTrades, lastYearTrades] = await Promise.all([fetchThisYearTrades(), fetchLastYearTrades()])
                                                .catch( err => {
                                                    console.error('Error fetching trades',err);
                                                    return;
                                                });
    // console.log('response', response);
    if(!thisYearTrades || !lastYearTrades) return;

    console.log('-'.repeat(50));
    //** QUESTION NUMBER 1 */
    const filteredTradesThisYear = thisYearTrades.trades.entries.filter( entry => Number(entry[0]) >= startDateThisYear); //Filter entries where dates are greater than 01/03/2024 12:00pm
    // console.log('filteredTradesThisYear', filteredTradesThisYear);
    
    const totalCLP = filteredTradesThisYear.reduce((acc, entry) => acc + Number(entry[2]) * Number(entry[1]),0);
    
    console.log('Total CLP', totalCLP.toFixed(2));
    console.log('Formatted total in CLP', convertToClp(totalCLP));
    /**
     * Total would be 5.948.902.534,61
     */

    console.log('-'.repeat(50));
    //** QUESTION NUMBER 2 */
    
    const lastYearFilteredTrades = lastYearTrades.trades.entries.filter( entry => Number(entry[0]) >= startDateLastYear); //Filter entries where dates are greater than 01/03/2023 12:00pm
    // console.log('lastYearFilteredTrades', lastYearFilteredTrades);

    const btcTransactionsLastYear = lastYearFilteredTrades.reduce((acc, entry) => acc + Number(entry[1]),0);
    console.log('Last Year BTC volume transactions', btcTransactionsLastYear);

    const btcTransactionsThisYear = filteredTradesThisYear.reduce((acc, entry) => acc + Number(entry[1]),0);
    console.log('This year BTC volume transactions', btcTransactionsThisYear);
    /**
     * Total BTC transactions LAST year is 0.47857174
     * Total BTC transactions THIS year is 0.7367471900000002
     */

    const percentage = (btcTransactionsThisYear  - btcTransactionsLastYear)/btcTransactionsLastYear *100;
    console.log('Percentage increased BTC', percentage.toFixed(2) + '%');
    /**
    * The percentage increased by 53.95%
    */

    console.log('-'.repeat(50));
    //** QUESTION NUMBER 3 */
    const budaCommission = 0.08;
    const lostCommissions = totalCLP * budaCommission; 
    console.log('Lost commisions', lostCommissions.toFixed(2));
    console.log('Formatted lost commisions', convertToClp(lostCommissions));
    /**
     * Lost commissions are 3511323.56
     */

    console.log('-'.repeat(50));

}

main(); 