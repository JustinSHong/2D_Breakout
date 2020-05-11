import { IBall } from './ball'
import { IBrick } from './brick'
import { IPaddle } from './paddle'
import { IPlayer } from './player'

export interface ICanvas {
	height: number
	width: number
	ctx: CanvasRenderingContext2D
	clear(): void
	detectBrickCollisions(ball: IBall, brick: IBrick, player: IPlayer): void
	detectEdgeCollisions(ball: IBall, paddle: IPaddle, player: IPlayer): void
}

class Canvas implements ICanvas {
	public canvas: HTMLCanvasElement
	public ctx: CanvasRenderingContext2D
	public height: number
	public width: number

	constructor() {
		this.canvas = document.getElementById('myCanvas') as HTMLCanvasElement
		this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
		this.width = this.canvas.width
		this.height = this.canvas.height
	}

	clear() {
		this.ctx.clearRect(0, 0, this.width, this.height)
	}

	// detect collisions against canvas edges
	detectEdgeCollisions(ball: IBall, paddle: IPaddle, player: IPlayer) {
		// detect collisions with top edge
		if (ball.y + ball.dy < ball.ballRadius) {
			ball.dy = -ball.dy
			ball.changeColor()
		} else if (ball.y + ball.dy > this.height - ball.ballRadius) {
			if (
				ball.x > paddle.paddleX &&
				ball.x < paddle.paddleX + paddle.paddleWidth
			) {
				// ball collides with the paddle
				ball.dy = -ball.dy
				ball.changeColor()
			} else {
				player.lives--
				if (player.lives === 0) {
					alert('Game Over')
					document.location.reload()
				} else {
					ball.x = this.width / 2
					ball.y = this.height - 30
					paddle.paddleX = (this.width - paddle.paddleWidth) / 2
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

	detectBrickCollisions(ball: IBall, brick: IBrick, player: IPlayer) {
		// compare position of bricks with the ball for every frame
		for (let col = 0; col < brick.brickColumnCount; col++) {
			for (let row = 0; row < brick.brickRowCount; row++) {
				let b = brick.bricks[col][row]

				if (b.status === 1) {
					// a collision with a brick occurs when the center of the ball is inside a brick's coordinates
					// if a collision occurs, change the movement of the ball, a brick's status, score
					if (
						ball.x > b.x && // x position of the ball is greater than the x position of the brick
						ball.x < b.x + brick.brickWidth && // x position of the ball is less than the x position of the brick plus its width
						ball.y > b.y && // y position of the ball is greater than the y position of the brick
						ball.y < b.y + brick.brickHeight // y position of the ball is less than the y position of the brick plus its height
					) {
						ball.dy = -ball.dy
						ball.changeColor()
						b.status = 0
						player.score++
						if (
							player.score ==
							brick.brickRowCount * brick.brickColumnCount
						) {
							// display winning msg when score is equal to the number of bricks
							alert('You Win! Congrats!')
							document.location.reload()
						}
					}
				}
			}
		}
	}
}

export default Canvas
