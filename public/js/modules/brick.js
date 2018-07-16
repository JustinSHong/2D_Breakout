class Brick {
	constructor() {
		// brick properties
		this.brickColor = "#0095DD";
		this.brickRowCount = 3;
		this.brickColumnCount = 5;
		this.brickWidth = 75;
		this.brickHeight = 20;
		this.brickPadding = 10;
		this.brickOffsetTop = 30;
		this.brickOffsetLeft = 30;
		// initialize bricks
		this.bricks = [];

		for (let col = 0; col < this.brickColumnCount; col++) {
			this.bricks[col] = [];
			for (let row = 0; row < this.brickRowCount; row++) {
				this.bricks[col][row] = { x: 0, y: 0, status: 1 }; // default brick properties
			}
		}
	}

	// draw brick grid to the canvas
	drawBricks(canvas) {
		for (let col = 0; col < this.brickColumnCount; col++) {
			for (let row = 0; row < this.brickRowCount; row++) {
				let brick = this.bricks[col][row];
				if (brick.status === 1) {
					// ball did not collide with brick
					let brickX =
						col * (this.brickWidth + this.brickPadding) + this.brickOffsetLeft; // offset X position from previous brick
					let brickY =
						row * (this.brickHeight + this.brickPadding) + this.brickOffsetTop; // offset Y position from previous brick
					brick.x = brickX;
					brick.y = brickY;
					canvas.ctx.beginPath();
					canvas.ctx.rect(brick.x, brick.y, this.brickWidth, this.brickHeight);
					canvas.ctx.fillStyle = this.brickColor;
					canvas.ctx.fill();
					canvas.ctx.closePath();
				}
			}
		}
	}
}

export default Brick;
