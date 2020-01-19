import { ICanvas } from './canvas'
import { IGameMode } from '../game'

interface IBall {
	ballRadius: number
	dx: number
	dy: number
	x: number
	y: number
}

class Ball implements IBall {
	constructor(
		private ballColor: string,
		public ballRadius: number,
		public dx: number,
		public dy: number,
		public width: number,
		public height: number,
		public mode: IGameMode,
		public x: number,
		public y: number
	) {
		this.ballColor = '#0095DD'
		// starting position
		this.x = width / 2
		this.y = height - 30
		this.ballRadius = 10
		// velocity - change in position
		this.dx = mode.dx
		this.dy = mode.dy
	}

	changeColor() {
		const red = Math.random() * 256
		const green = Math.random() * 256
		const blue = Math.random() * 256
		const color = `rgb(${red}, ${green}, ${blue})`
		this.ballColor = color
	}

	// draw ball to the canvas
	drawBall(canvas: ICanvas) {
		canvas.ctx.beginPath()
		canvas.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2)
		canvas.ctx.fillStyle = this.ballColor
		canvas.ctx.fill()
		canvas.ctx.closePath()
	}

	// update ball's movement
	update() {
		this.x += this.dx
		this.y += this.dy
	}
}

export default Ball
