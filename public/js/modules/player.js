class Player {
	constructor() {
		this.lives = 3;
		this.score = 0;
		this.opponentScore = 0;
		this.opponentLives = 0;
		this.x = 0;
		this.y = 0;
	}

	// draw current score to the canvas
	drawScore(canvas) {
		canvas.ctx.font = "16px Arial";
		canvas.ctx.fillStyle = "#0095DD";
		canvas.ctx.fillText("Score: " + this.score, 8, 20);
		canvas.ctx.fillText("Opponent's Score " + this.opponentScore, 8, 30);
	}

	// draw current number of lives to the canvas
	drawLives(canvas) {
		canvas.ctx.font = "16px Arial";
		canvas.ctx.fillStyle = "#0095DD";
		canvas.ctx.fillText("Lives: " + this.lives, canvas.width - 65, 20);
	}

	// udpate player data
	update(lives, username, score) {
		this.lives += lives;
		this.username = username;
		this.score += score;
	}
}

export default Player;
