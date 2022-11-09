const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('e-doctor server is Running')
})

app.listen(port, () => {
  console.log(`e-doctor Server is Running on ${port}`)
})
