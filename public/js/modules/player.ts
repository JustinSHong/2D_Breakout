import { ICanvas } from './canvas'

export interface IPlayer {
	lives: number
	score: number
	opponentScore: number
	opponentLives: number
	mode: any
	drawScore(canvas: ICanvas): void
	drawLives(canvas: ICanvas): void
}

class Player implements IPlayer {
	public lives: number
	public score: number
	public opponentScore: number
	public opponentLives: number

	constructor(public mode: any) {
		this.lives = mode.lives
		this.score = 0
		this.opponentScore = 0
		this.opponentLives = 0
	}

	// draw current score to the canvas
	public drawScore(canvas: ICanvas) {
		canvas.ctx.font = '24px Arial'
		canvas.ctx.fillStyle = '#0095DD'
		canvas.ctx.fillText('Score: ' + this.score, 8, 20)
		canvas.ctx.fillText("Opponent's Score: " + this.opponentScore, 8, 40)
	}

	// draw current number of lives to the canvas
	public drawLives(canvas: ICanvas) {
		canvas.ctx.font = '24px Arial'
		canvas.ctx.fillStyle = '#0095DD'
		canvas.ctx.fillText('Lives: ' + this.lives, canvas.width - 90, 20)
		canvas.ctx.fillText(
			"Opponent's Lives: " + this.opponentLives,
			canvas.width - 218,
			40
		)
	}

	// udpate player data
	// update(lives: number, username: string, score: number) {
	// 	this.lives += lives
	// 	this.username = username
	// 	this.score += score
	// }
}

export default Player
