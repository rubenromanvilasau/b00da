const express = require('express');
const app = express();
require('dotenv').config();

app.set('port', process.env.PORT || 5000);

const routes = require('./routes/index');
app.use('/api', routes); 

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});

module.exports = app;