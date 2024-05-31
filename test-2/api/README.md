# SPREAD API BUDA

## Getting started

Documentation of the API is in file 'API BUDA.postman_collection.json', that file has the requests with each route and it's short documentation. You can import it with Postman to test app. 

## Tech
Node js 
Express
Axios
Dotenv 
Jest

To run in development mode just 
```bash
npm run dev
```
that will execute app with Nodemon.

To run it normally just
```bash
node app.js
```

There are also docker files to create image and run it,
so just do 
```bash
docker build -t api-buda .
docker run -p 4000:4000 --name api-buda
``` 
