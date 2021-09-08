const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = 5000

const app = express()

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://BurjAlArab:Rabby01711353001@cluster0.0hc8c.mongodb.net/burjAlArab?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const bookings = client.db("burjAlArab").collection("bookings");
  // perform actions on the collection object
  console.log('mongo db connected');
  app.post('/addBooking', (req,res)=>{
      const newBooking = req.body;
      bookings.insertOne(newBooking)
      .then(result =>{
          console.log(result);
      })
      console.log(newBooking);
  })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})