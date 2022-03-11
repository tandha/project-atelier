const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const port = 3000;
const { API_URL, API_KEY } = require('./config.js');
const compression = require('compression');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(compression());

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.all('/*', (req, res) => {

  const apiPaths = ['/products', '/reviews', '/qa', '/cart', '/interactions'];
  let isApiPath = apiPaths.some(apiPath => req.url.startsWith(apiPath));

  if (isApiPath) {
    axios({
      headers: { 'Authorization': API_KEY },
      baseURL: API_URL,
      url: req.url,
      method: req.method,
      data: req.body
    })
      .then((apiResponse) => {
        res.send({
          data: apiResponse.data,
          status: apiResponse.status
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(err.response.status).send('API request error.');
      });

  } else {
    axios({
      headers: { 'Authorization': API_KEY },
      baseURL: API_URL,
      url: `/products${req.url}`,
      method: req.method,
    })
      .then(() => {
        let productID = req.url.substring(1);
        res.redirect(`/?${productID}`);
      })
      .catch((err) => {
        console.log(err);
        res.redirect('/');
      });
  }
});

app.listen(port, ()=> {
  console.log(`Listening at localhost:${port}`);
});