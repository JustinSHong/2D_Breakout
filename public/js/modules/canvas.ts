import { IBall } from './ball'
import { IBrick } from './brick'
import { IPaddle } from './paddle'
import { IPlayer } from './player'

export interface ICanvas {
	clear(): void
	detectBrickCollisions(ball: IBall, brick: IBrick, player: IPlayer): void
	detectEdgeCollisions(ball: IBall, paddle: IPaddle, player: IPlayer): void
	getCanvas(): HTMLCanvasElement
	getCtx(): CanvasRenderingContext2D
	getHeight(): number
	getWidth(): number
}

class Canvas implements ICanvas {
	private canvas: HTMLCanvasElement
	private ctx: CanvasRenderingContext2D
	readonly height: number
	readonly width: number

	constructor() {
		this.canvas = document.getElementById('myCanvas') as HTMLCanvasElement
		this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
		this.width = this.canvas.width
		this.height = this.canvas.height
	}

	public clear(): void {
		this.ctx.clearRect(0, 0, this.width, this.height)
	}

	// detect collisions against canvas edges
	public detectEdgeCollisions(
		ball: IBall,
		paddle: IPaddle,
		player: IPlayer
	): void {
		const paddleX = paddle.getPaddleX()
		const paddleWidth = paddle.getPaddleWidth()
		const playerLives = player.getLives()

		// detect collisions with top edge
		if (ball.y + ball.dy < ball.ballRadius) {
			ball.dy = -ball.dy
			ball.changeColor()
		} else if (ball.y + ball.dy > this.height - ball.ballRadius) {
			if (ball.x > paddleX && ball.x < paddleX + paddleWidth) {
				// ball collides with the paddle
				ball.dy = -ball.dy
				ball.changeColor()
			} else {
				// player.lives--
				player.setLives(playerLives - 1)
				if (playerLives === 0) {
					alert('Game Over')
					document.location.reload()
				} else {
					ball.x = this.width / 2
					ball.y = this.height - 30
					paddle.setPaddleX((this.width - paddleWidth) / 2)
				}
			}
		}
		// detect collision with left and right edges
		if (
			ball.x + ball.dx < ball.ballRadius ||
			ball.x + ball.dx > this.width - ball.ballRadius
		) {
			ball.dx = -ball.dx
			ball.changeColor()
		}
	}

	public detectBrickCollisions(
		ball: IBall,
		brick: IBrick,
		player: IPlayer
	): void {
		const brickColumnCount = brick.getBrickColumnCount()
		const brickRowCount = brick.getBrickRowCount()
		const bricks = brick.getBricks()
		const brickHeight = brick.getBrickHeight()
		const brickWidth = brick.getBrickWidth()
		const playerScore = player.getScore()

		// compare position of bricks with the ball for every frame
		for (let col = 0; col < brickColumnCount; col++) {
			for (let row = 0; row < brickRowCount; row++) {
				let b = bricks[col][row]

				if (b.status === 1) {
					// a collision with a brick occurs when the center of the ball is inside a brick's coordinates
					// if a collision occurs, change the movement of the ball, a brick's status, score
					if (
						ball.x > b.x && // x position of the ball is greater than the x position of the brick
						ball.x < b.x + brickWidth && // x position of the ball is less than the x position of the brick plus its width
						ball.y > b.y && // y position of the ball is greater than the y position of the brick
						ball.y < b.y + brickHeight // y position of the ball is less than the y position of the brick plus its height
					) {
						ball.dy = -ball.dy
						ball.changeColor()
						b.status = 0
						// player.score++
						player.setScore(playerScore + 1)
						if (playerScore == brickRowCount * brickColumnCount) {
							// display winning msg when score is equal to the number of bricks
							alert('You Win! Congrats!')
							document.location.reload()
						}
					}
				}
			}
		}
	}

	public getCanvas(): HTMLCanvasElement {
		return this.canvas
	}

	public getCtx(): CanvasRenderingContext2D {
		return this.ctx
	}

	public getHeight(): number {
		return this.height
	}

	public getWidth(): number {
		return this.width
	}
}

export default Canvas
