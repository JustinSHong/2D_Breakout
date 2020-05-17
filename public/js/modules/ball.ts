import { ICanvas } from './canvas'
export interface IBall {
	changeColor(): void
	drawBall(canvas: ICanvas): void
	update(): void
	getBallColor(): string
	getBallRadius(): number
	getBallDx(): number
	getBallDy(): number
	getBallX(): number
	getBallY(): number
	setBallX(x: number): void
	setBallY(y: number): void
	setBallDx(dx: number): void
	setBallDy(dy: number): void
}

// todo: restrict public members, use getters and setters

class Ball implements IBall {
	private ballColor: string
	private ballRadius: number
	private dx: number
	private dy: number
	private x: number
	private y: number

	constructor(public height: number, public width: number, public mode: any) {
		this.ballColor = '#0095DD'
		this.ballRadius = 10
		this.mode = mode.getMode()
		// starting position
		this.x = width / 2
		this.y = height - 30
		// velocity - change in position
		this.dx = this.mode.dx
		this.dy = this.mode.dy
	}

	public changeColor(): string {
		const red = Math.random() * 256
		const green = Math.random() * 256
		const blue = Math.random() * 256
		const color = `rgb(${red}, ${green}, ${blue})`
		this.ballColor = color
		return this.ballColor
	}

	// draw ball to the canvas
	public drawBall(canvas: ICanvas): void {
		const ctx = canvas.getCtx()

		ctx.beginPath()
		ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2)
		ctx.fillStyle = this.ballColor
		ctx.fill()
		ctx.closePath()
	}

	// update ball's movement
	public update(): { x: number; y: number } {
		this.x += this.dx
		this.y += this.dy
		return { x: this.x, y: this.y }
	}

	public getBallColor(): string {
		return this.ballColor
	}

	public getBallRadius(): number {
		return this.ballRadius
	}

	public getBallX(): number {
		return this.x
	}

	public getBallY(): number {
		return this.y
	}

	public getBallDx(): number {
		return this.dx
	}

	public getBallDy(): number {
		return this.dy
	}

	public setBallX(x: number): void {
		this.x = x
	}

	public setBallY(y: number): void {
		this.y = y
	}

	public setBallDx(dx: number): void {
		this.dx = dx
	}

	public setBallDy(dy: number): void {
		this.dy = dy
	}
}

export default Ball
