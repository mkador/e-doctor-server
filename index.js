const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const cors = require('cors')
const port = process.env.PORT || 5000
require('dotenv').config()

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.1g0ejju.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})

async function run() {
  try {
    const servicesCollection = client.db('e-doctor').collection('services')
    const reviewsCollection = client.db('e-doctor').collection('reviews')
    /// only three services in home page
    app.get('/services', async (req, res) => {
      const query = {}
      const cursor = servicesCollection.find(query)
      const services = await cursor.limit(3).toArray()
      res.send(services)
    })

    ////all services api to show all service in all services section
    app.get('/allServices', async (req, res) => {
      const query = {}
      const cursor = servicesCollection.find(query)
      const services = await cursor.toArray()
      res.send(services)
    })
    ///Single service with details api
    app.get('/services/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const service = await servicesCollection.findOne(query)
      res.send(service)
    })

    /// for adding service api
    app.post('/allServices', async (req, res) => {
      const addService = req.body
      const result = await servicesCollection.insertOne(addService)
      res.send(result)
    })

    app.post('/reviews', async (req, res) => {
      const addReviews = req.body
      const result = await reviewsCollection.insertOne(addReviews)
      res.send(result)
    })

    app.get('/reviews', async (req, res) => {
      const query = {}
      const cursor = reviewsCollection.find(query)
      const reviews = await cursor.toArray()

      res.send(reviews)
    })

    app.delete('/reviews/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const result = await reviewsCollection.deleteOne(query)
      res.send(result)
    })
    //my review  api

    app.get('/reviews', async (req, res) => {
      let query = {}
      if (req.query.email) {
        query = {
          email: req.query.email,
        }
      }
      const cursor = reviewsCollection.find(query)
      const reviews = await cursor.toArray()
      res.send(reviews)
    })
    //my review delete api
    app.delete('/reviews/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const result = await reviewsCollection.deleteOne(query)
      res.send(result)
    })
  } finally {
  }
}
run().catch((error) => console.error(error))

app.get('/', (req, res) => {
  res.send('e-doctor server is Running')
})

app.listen(port, () => {
  console.log(`e-doctor Server is Running on ${port}`)
})
