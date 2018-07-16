class Player {
	constructor() {
		// default number of player lives
		this.lives = 3;
		this.username = "";
		this.score = 0;
	}

	// draw current score to the canvas
	drawScore(canvas) {
		canvas.ctx.font = "16px Arial";
		canvas.ctx.fillStyle = "#0095DD";
		canvas.ctx.fillText("Score: " + this.score, 8, 20);
	}

	// draw current number of lives to the canvas
	drawLives(canvas) {
		canvas.ctx.font = "16px Arial";
		canvas.ctx.fillStyle = "#0095DD";
		canvas.ctx.fillText("Lives: " + this.lives, canvas.width - 65, 20); // OBTAIN CANVAS WIDTH
	}

	// udpate player data
	update(lives, username, score) {
		this.lives += lives;
		this.username = username;
		this.score += score;
	}
}

export default Player;
