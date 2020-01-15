const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')

const mongoDBUser = 'diovani'
const mongoDBPassword = 'E2De1EJAL5bKIJZO'

const app = express()

mongoose.connect(`mongodb+srv://${mongoDBUser}:${mongoDBPassword}@omnistack10-kmsns.mongodb.net/omnistack10?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(express.json())
app.use(routes)

app.listen(3333)
