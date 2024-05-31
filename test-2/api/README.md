# SPREAD API BUDA

## Getting started

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
App will run on production mode.

