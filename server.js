const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = mongoose
.createConnection('mongodb://localhost/sports-figures-db');
const cors = require('cors');

const SportsFigures = require('./SportsFigures.js')(db);


app.use(cors());
app.use(bodyParser.json());

//root rute
app.get('/api/SportsFigures', function(req,res){
  console.log("Received request for SportsFigures");
  SportsFigures.find()
  .then(function(dbFigures){
    res.json(dbFigures);
  })
  .catch(function(err){
    console.log(err);
    res.setStatus(500).end("Error with DB query");
  });
});

app.post('/api/sportsfigures', function(req, res){
  let newSportsFigures = new SportsFigures(req.body);
  newSportsFigures.save()
  .then(dbResult=>{
    console.log(dbResult);
    res.setStatus(201).json(dbResult);
  })
  .catch(err=>{
    console.log(err);
    res.setStatus(500).send("error");
})
});

app.listen(1338, ()=>console.log('App listening...'));
