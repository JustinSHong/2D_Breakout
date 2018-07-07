const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// starting point for the ball
let x = canvas.height - 30;
let y = canvas.width / 2;

// values that x and y will change by each frame
const dx = 2;
const dy = -2;

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, 10, 0, Math.PI * 2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

// draws the ball onto the canvas with different position
function draw() {
	// clear previous ball before drawing a new one
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBall();
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
