import { ICanvas } from './canvas'
import { IGameMode } from '../game'

export interface IBall {
	ballRadius: number
	dx: number
	dy: number
	x: number
	y: number
	changeColor(): void
	drawBall(canvas: ICanvas): void
	update(): void
}

class Ball implements IBall {
	public ballColor: string
	public ballRadius: number
	public dx: number
	public dy: number
	public x: number
	public y: number

	constructor(
		public height: number,
		public width: number,
		public mode: IGameMode
	) {
		this.ballColor = '#0095DD'
		this.ballRadius = 10
		// starting position
		this.x = width / 2
		this.y = height - 30
		// velocity - change in position
		this.dx = mode.dx
		this.dy = mode.dy
	}

	public changeColor(): void {
		const red = Math.random() * 256
		const green = Math.random() * 256
		const blue = Math.random() * 256
		const color = `rgb(${red}, ${green}, ${blue})`
		this.ballColor = color
	}

	// draw ball to the canvas
	public drawBall(canvas: ICanvas): void {
		canvas.ctx.beginPath()
		canvas.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2)
		canvas.ctx.fillStyle = this.ballColor
		canvas.ctx.fill()
		canvas.ctx.closePath()
	}

	// update ball's movement
	public update(): void {
		this.x += this.dx
		this.y += this.dy
	}
}

export default Ball
