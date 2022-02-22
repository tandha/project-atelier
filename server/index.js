const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const port = 3000;
const { API_URL, API_KEY } = require('./config.js');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

let myOutfits = [];
app.get('/outfits', (req, res) => {
  console.log('give me the outfits', myOutfits);
  res.status(200).send(myOutfits);
});

app.post('/outfits', (req, res) => {
  let outfit = req.body.id;
  myOutfits.push(outfit);
  console.log(myOutfits);
  res.status(201).send(myOutfits);
});

app.delete('/outfits', (req, res) => {
  let outfit = req.body.id;
  let index = myOutfits.indexOf(outfit);
  myOutfits.splice(index, 1);
  console.log(myOutfits);
  res.status(201).send(myOutfits);
});

app.all('/*', (req, res) => {
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
      res.status(500).send('Something broke!');
    });
});

app.listen(port, ()=> {
  console.log(`Listening at localhost:${port}`);
});