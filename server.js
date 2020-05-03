// Dependencies
const express = require('express')
const app = express()
const server = require('http').Server(app)
const helmet = require('helmet')
const cors = require('cors')

const PORT = process.env.PORT || 8081

// middleware
app.use(helmet())
app.use(express.json())
app.use(cors())

// render the static files
app.use(express.static(__dirname + '/dist'))

// Root - server serves index.html
app.get('/', (req, res) => {
	console.log('SERVING STATIC FILE')
	res.sendFile(__dirname + '/index.html')
})

// start server at port 5000
server.listen(PORT, () => {
	console.log(`\n==API Running on port ${PORT} ==\n`)
})
