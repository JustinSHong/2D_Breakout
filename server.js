// Dependencies
const express = require("express");
const app = express();
const server = require("https").Server(app);
const io = require("socket.io").listen(server);
const helmet = require("helmet");
const cors = require("cors");

const PORT = process.env.PORT;

// middleware
app.use(helmet());
app.use(express.json());
app.use(cors());

// render the static files
app.use(express.static(__dirname + "/build"));
app.use(express.static(__dirname + "/public"));

// Root - server serves index.html
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

const players = {};
let playerID = 0;
// client connects to server
io.on("connection", function(socket) {
	console.log("a user connected");
	// DEBUGGING: verify a socket has been established
	// socket.emit("SocketId", addNewPlayer(socket.id));

	// emit to all clients except the newest one
	socket.broadcast.emit("SocketId", players[playerID]);

	socket.on("playerScored", function(player) {
		socket.broadcast.emit("otherPlayerScore", player.score);
	});

	socket.on("playerLife", function(player) {
		socket.broadcast.emit("otherPlayerLife", player.lives);
	});

	socket.on("disconnect", function() {
		console.log("a user disconnected", socket.id);
	});
});

function addNewPlayer(id) {
	playerID += 1;
	players[playerID] = {
		socketID: id,
		playerID: playerID,
		lives: 3,
		score: 0
	};
	return players[playerID];
}

// start server at port 5000
server.listen(PORT, () => {
	console.log(`\n==API Running on port ${PORT} ==\n`);
});
