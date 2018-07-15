// Dependencies
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io").listen(server);
const helmet = require("helmet");
const cors = require("cors");

const PORT = 8081;

// middleware
app.use(helmet());
app.use(express.json());
app.use(cors());

// render the static files
app.use(express.static(__dirname + "/public"));

// Root - server serves index.html
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/build/index.html");
});

io.on("connection", function(socket) {
	console.log("a user connected");
	socket.on("disconnect", function() {
		console.log("a user disconnected");
	});
});

// start server at port 5000
server.listen(PORT, () => {
	console.log(`\n==API Running on port ${PORT} ==\n`);
});
