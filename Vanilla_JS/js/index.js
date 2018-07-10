const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let lives = 3;

let score = 0;

const ballRadius = 10;

// starting point for the ball
let x = canvas.height - 30;
let y = canvas.width / 2;

// values that x and y will change by each frame
let dx = 2;
let dy = -2;

// paddle dimensions
const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2; // starting point of the paddle

// pressed buttons states
let rightPressed = false;
let leftPressed = false;

// listen for key press and key release
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// listen for mouse movement
document.addEventListener("mousemove", mouseMoveHandler, false);

const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const bricks = [];
for (let col = 0; col < brickColumnCount; col++) {
	bricks[col] = [];
	for (let row = 0; row < brickRowCount; row++) {
		bricks[col][row] = { x: 0, y: 0, status: 1 }; // default brick properties
	}
}

function mouseMoveHandler(e) {
	let relativeX = e.clientX - canvas.offsetLeft;
	if (relativeX > 0 && relativeX < canvas.width) {
		paddleX = relativeX - paddleWidth / 2;
	}
}

function keyDownHandler(e) {
	if (e.keyCode === 39) {
		// right cursor key pressed
		rightPressed = true;
	} else if (e.keyCode === 37) {
		// left cursor key pressed
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	// reset key state to default
	if (e.keyCode === 39) {
		// right cursor key released
		rightPressed = false;
	} else if (e.keyCode === 37) {
		// right cursor key released
		leftPressed = false;
	}
}

function collisionDetection() {
	// compare position of bricks with the ball for every frame
	for (let col = 0; col < brickColumnCount; col++) {
		for (let row = 0; row < brickRowCount; row++) {
			let brick = bricks[col][row];
			// a collision with a brick occurs when the center of the ball is inside a brick's coordinates
			// if a collision occurs, change the movement of the ball, a brick's status, score
			if (brick.status === 1) {
				if (
					x > brick.x && // x position of the ball is greater than the x position of the brick
					x < brick.x + brickWidth && // x position of the ball is less than the x position of the brick plus its width
					y > brick.y && // y position of the ball is greater than the y position of the brick
					y < brick.y + brickHeight // y position of the ball is less than the y position of the brick plus its height
				) {
					dy = -dy;
					brick.status = 0;
					score++;
					if (score == brickRowCount * brickColumnCount) {
						// display winning msg when score is equal to the number of bricks
						alert("You Win! Congrats!");
						document.location.reload();
					}
				}
			}
		}
	}
}

function drawLives() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: " + score, 8, 20);
}

function drawBricks() {
	for (let col = 0; col < brickColumnCount; col++) {
		for (let row = 0; row < brickRowCount; row++) {
			if (bricks[col][row].status === 1) {
				// ball did not collide with brick
				let brickX = col * (brickWidth + brickPadding) + brickOffsetLeft;
				let brickY = row * (brickHeight + brickPadding) + brickOffsetTop;
				bricks[col][row].x = brickX;
				bricks[col][row].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "#0095DD";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function draw() {
	// clear previous ball before drawing a new one
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	drawScore();
	collisionDetection();
	// detect collisions with top edge
	if (y + dy < ballRadius) {
		dy = -dy;
	} else if (y + dy > canvas.height - ballRadius) {
		if (x > paddleX && x < paddleX + paddleWidth) {
			// ball collides with the paddle
			dy = -dy;
		} else {
			// ball reaches the bottom edge
			alert("GAME OVER");
			document.location.reload(); // refreshes the page to restart the game
		}
	}
	// detect collision with left and right edges
	if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
		dx = -dx;
	}
	// move paddle right until the right edge of the canvas
	if (rightPressed && paddleX < canvas.width - paddleWidth) {
		paddleX += 7;
	} else if (leftPressed && paddleX > 0) {
		// move paddle left until the left edge of the canvas
		paddleX -= 7;
	}
	// increment x and y
	x += dx;
	y += dy;
}

setInterval(draw, 10);

// // creates a red rectangle with height and width of 50px
// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = "#FF0000";
// ctx.fill();
// ctx.closePath();

// // creates a green circle
// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI * 2);
// ctx.fillStyle = "green";
// ctx.fill();
// ctx.closePath();

// // creates a blue-stroked empty rectangle
// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);
// ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
// ctx.stroke();
// ctx.closePath();
