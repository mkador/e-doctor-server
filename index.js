const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion } = require('mongodb')
const cors = require('cors')
const port = process.env.PORT || 5000
require('dotenv').config()

app.use(cors())
app.use(express.json())

console.log(process.env.DB_USER)

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.1g0ejju.mongodb.net/?retryWrites=true&w=majority`
console.log(uri)
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})

app.get('/', (req, res) => {
  res.send('e-doctor server is Running')
})

app.listen(port, () => {
  console.log(`e-doctor Server is Running on ${port}`)
})
