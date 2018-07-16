class Ball {
	constructor(height, width) {
		this.ballColor = "#0095DD";
		// starting position
		this.x = width / 2;
		this.y = height - 30;
		this.ballRadius = 10;
		// velocity - change in position
		this.dx = 2;
		this.dy = -2;
	}

	// draw ball to the canvas
	drawBall(canvas) {
		canvas.ctx.beginPath();
		canvas.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
		canvas.ctx.fillStyle = this.ballColor;
		canvas.ctx.fill();
		canvas.ctx.closePath();
	}

	// update ball's movement
	update() {
		this.x += this.dx;
		this.y += this.dy;
	}
}

export default Ball;
