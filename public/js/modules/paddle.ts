import { ICanvas } from './canvas'

export interface IPaddle {
	canvas: ICanvas
	paddleWidth: number
	paddleX: number
	drawPaddle(canvas: ICanvas): void
	update(x: number): void
}

class Paddle implements IPaddle {
	public paddleColor: string
	public paddleHeight: number
	public paddleWidth: number
	public paddleX: number

	constructor(public canvas: ICanvas) {
		// paddle properties
		this.paddleColor = '#0095DD'
		this.paddleHeight = 10
		this.paddleWidth = 75
		// starting position
		this.paddleX = (canvas.width - this.paddleWidth) / 2
	}

	// draw paddle to the canvas
	public drawPaddle(canvas: ICanvas) {
		canvas.ctx.beginPath()
		canvas.ctx.rect(
			this.paddleX,
			canvas.height - this.paddleHeight,
			this.paddleWidth,
			this.paddleHeight
		)
		canvas.ctx.fillStyle = this.paddleColor
		canvas.ctx.fill()
		canvas.ctx.closePath()
	}

	// update paddle position
	public update(x: number) {
		this.paddleX += x
	}
}

export default Paddle
