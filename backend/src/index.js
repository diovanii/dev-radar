const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http')
const routes = require('./routes')
const { setupWebSocket } = require('./websocket')

const mongoDBUser = 'diovani'
const mongoDBPassword = 'E2De1EJAL5bKIJZO'

const app = express()
const server = http.Server(app)

setupWebSocket(server)

mongoose.connect(`mongodb+srv://${mongoDBUser}:${mongoDBPassword}@omnistack10-kmsns.mongodb.net/omnistack10?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(cors())
app.use(express.json())
app.use(routes)

server.listen(3333)
