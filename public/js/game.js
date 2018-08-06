// modules
import Canvas from "./modules/canvas";
import Ball from "./modules/ball";
import Brick from "./modules/brick";
import Paddle from "./modules/paddle";
import Player from "./modules/player";
import socket from "./modules/client";

// emable live reload
document.write(
	'<script src="http://' +
		(location.host || "localhost").split(":")[0] +
		':35729/livereload.js?snipver=1"></' +
		"script>"
);

class Game {
	constructor() {
		this.rightPressed = false;
		this.leftPressed = false;
		this.players = []; // holds all players in the game

		// listen for key press and key release
		window.addEventListener("keydown", this.keyDownHandler, false);
		window.addEventListener("keyup", this.keyUpHandler, false);
		// listen for mouse movement
		window.addEventListener("mousemove", this.mouseMoveHandler, false);
	}

	// initialize the game objects and the game loop
	init() {
		requestAnimationFrame(() => this.draw(canvas));
	}

	// main draw function of the game - initiates game loop - WORK IN PROGRESS
	draw(canvas) {
		// clear previous ball before drawing a new one
		canvas.clear();
		canvas.ctx.beginPath();
		paddle.drawPaddle(canvas);
		brick.drawBricks(canvas);
		ball.drawBall(canvas);
		player.drawScore(canvas);
		player.drawLives(canvas);
		canvas.detectBrickCollisions(ball, brick, player);
		canvas.detectEdgeCollisions(ball, paddle, player);

		socket.emit("playerScored", player); // send player data to server
		socket.emit("playerLife", player);

		// move paddle right until the right edge of the canvas
		if (
			this.rightPressed &&
			paddle.paddleX < canvas.width - paddle.paddleWidth
		) {
			paddle.update(7);
		} else if (this.leftPressed && paddle.paddleX > 0) {
			paddle.update(-7);
		}
		// update ball's position
		ball.update();

		if (pause === false) {
			// animation loops
			requestAnimationFrame(() => {
				this.draw(canvas);
			});
		}
	}

	// check if a key was pressed
	keyDownHandler(e) {
		if (e.keyCode === 39) {
			// right cursor key pressed
			g.rightPressed = true;
		} else if (e.keyCode === 37) {
			// left cursor key pressed
			g.leftPressed = true;
		} else if (e.keyCode === 80) {
			// pause key pressed
			pause = !pause;
			if (pause === false) {
				g.init();
			}
		}
	}

	// check if a key was released
	keyUpHandler(e) {
		// reset key state to default
		if (e.keyCode === 39) {
			// right cursor key released
			g.rightPressed = false;
		} else if (e.keyCode === 37) {
			// right cursor key released
			g.leftPressed = false;
		}
	}

	// move paddle relative to the mouse position within canvas
	mouseMoveHandler(e) {
		let relativeX = e.clientX - canvas.canvas.offsetLeft;
		if (relativeX > 0 && relativeX < canvas.width) {
			paddle.paddleX = relativeX - paddle.paddleWidth / 2;
		}
	}
}

// pause flag
let pause = false;

// < ===== STARTING THE GAME ===== >

const canvas = new Canvas();
const ball = new Ball(canvas.height, canvas.width);
const brick = new Brick(canvas);
const paddle = new Paddle(canvas);
const player = new Player();
const g = new Game(); // instantiate a game

// DEBUGGING: verify a socket has been established
// socket.on("SocketId", function(data) {
// 	console.log(data);
// 	console.log(data.playerID);
// });

// store your opponent's score
socket.on("otherPlayerScore", function(data) {
	player.opponentScore = data;
});

// store your opponent's life count
socket.on("otherPlayerLife", function(data) {
	player.opponentLives = data;
});

g.init(); // start the game loop
