const express = require('express')
const bodyParser = require("body-parser");


//middlewares for accessing the request body

const app = express()
const port = 3000

app.use(bodyParser.json());
//app.use(express.json());

app.get('/', (req, res) => {
  console.log(req.body);
  res.send('Hello World!');
})


//from server http://localhost:3000/api/?n=3
app.get("/api/", (req, res) => {
  let n = req.query.n;
  let sq = n * n;
  res.send("Square of "+n+ " is "+ sq); //
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})