const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

mongoose.connect("mongodb://127.0.0.1/graphql");  

mongoose.connection.once("open",()=>{
  console.log('connected to databases!');   
});

app.use(cors());

app.use("/graphql",graphqlHTTP({
  schema , 
  graphiql: true
}));   

app.listen(4000,()=>{
  console.log('server start at port 4000 ');
})
