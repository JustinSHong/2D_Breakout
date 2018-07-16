// modules
import Canvas from "./modules/canvas";
import Ball from "./modules/ball";
import Brick from "./modules/brick";
import Paddle from "./modules/paddle";
import Player from "./modules/player";

// emable live reload
document.write(
	'<script src="http://' +
		(location.host || "localhost").split(":")[0] +
		':35729/livereload.js?snipver=1"></' +
		"script>"
);

class Game {
	constructor() {
		// this.rightPressed = false;
		// this.leftPressed = false;
	}

	// initialize the game objects and the game loop
	init() {
		window.requestAnimationFrame(() => this.draw(canvas));
	}

	// main draw function of the game - initiates game loop - WORK IN PROGRESS
	draw(canvas) {
		let rightPressed = false;
		let leftPressed = false;

		// listen for key press and key release
		document.addEventListener("keydown", this.keyDownHandler, false);
		document.addEventListener("keyup", this.keyUpHandler, false);
		// listen for mouse movement
		document.addEventListener("mousemove", this.mouseMoveHandler, false);
		// clear previous ball before drawing a new one
		canvas.clear();
		brick.drawBricks(canvas);
		ball.drawBall(canvas);
		paddle.drawPaddle(canvas);
		player.drawScore(canvas);
		player.drawLives(canvas);
		canvas.detectBrickCollisions(ball, brick, player);
		canvas.detectEdgeCollisions(ball, paddle, player);

		// move paddle right until the right edge of the canvas
		if (
			this.rightPressed &&
			paddle.paddleX < canvas.width - paddle.paddleWidth
		) {
			console.log("made it");
			paddle.update(7);
		} else if (this.leftPressed && paddle.paddleX > 0) {
			paddle.update(-7);
		}
		// update ball's position
		ball.update();

		// animation loops
		requestAnimationFrame(() => {
			this.draw(canvas);
		});
	}

	// check if a key was pressed
	keyDownHandler(e) {
		if (e.keyCode === 39) {
			// right cursor key pressed
			this.rightPressed = true;
		} else if (e.keyCode === 37) {
			// left cursor key pressed
			this.leftPressed = true;
		}
	}

	// check if a key was released
	keyUpHandler(e) {
		// reset key state to default
		if (e.keyCode === 39) {
			// right cursor key released
			this.rightPressed = false;
		} else if (e.keyCode === 37) {
			// right cursor key released
			this.leftPressed = false;
		}
	}

	// move paddle relative to the mouse position within canvas
	// mouseMoveHandler(e) {
	// 	let relativeX = e.clientX - canvas.offsetLeft;
	// 	if (relativeX > 0 && relativeX < canvas.width) {
	// 		paddle.paddleX = relativeX - paddle.paddleWidth / 2; // OBTAIN PADDLEX POSITION
	// 	}
	// }
}

