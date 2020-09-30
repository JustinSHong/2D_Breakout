import { ICanvas } from './canvas'

export interface IBrick {
	drawBricks(canvas: ICanvas): void
	getBrickColumnCount(): number
	getBrickRowCount(): number
	getBrickWidth(): number
	getBrickHeight(): number
	getBricks(): IBrickObject[][]
}

interface IBrickObject {
	status: number
	x: number
	y: number
}

class Brick implements IBrick {
	private brickColor: string
	private brickPadding: number
	private brickOffsetTop: number
	private brickOffsetLeft: number
	private brickColumnCount: number
	private brickRowCount: number
	private brickWidth: number
	private brickHeight: number
	private bricks: IBrickObject[][]

	constructor() {
		// brick properties
		this.brickColor = '#0095DD'
		this.brickRowCount = 10
		this.brickColumnCount = 7
		this.brickWidth = 75
		this.brickHeight = 20
		this.brickPadding = 10
		this.brickOffsetTop = 50
		this.brickOffsetLeft = 160
		// initialize bricks
		this.bricks = []

		for (let col = 0; col < this.brickColumnCount; col++) {
			this.bricks[col] = []
			for (let row = 0; row < this.brickRowCount; row++) {
				this.bricks[col][row] = { x: 0, y: 0, status: 1 } // default brick properties
			}
		}
	}

	// draw brick grid to the canvas
	public drawBricks(canvas: ICanvas): void {
		const ctx = canvas.getCtx()

		for (let col = 0; col < this.brickColumnCount; col++) {
			for (let row = 0; row < this.brickRowCount; row++) {
				let brick = this.bricks[col][row]
				if (brick.status === 1) {
					// ball did not collide with brick
					let brickX =
						col * (this.brickWidth + this.brickPadding) +
						this.brickOffsetLeft // offset X position from previous brick
					let brickY =
						row * (this.brickHeight + this.brickPadding) +
						this.brickOffsetTop // offset Y position from previous brick
					brick.x = brickX
					brick.y = brickY
					ctx.beginPath()
					ctx.rect(
						brick.x,
						brick.y,
						this.brickWidth,
						this.brickHeight
					)
					ctx.fillStyle = this.brickColor
					ctx.fill()
					ctx.closePath()
				}
			}
		}
	}

	getBrickColumnCount(): number {
		return this.brickColumnCount
	}

	getBrickRowCount(): number {
		return this.brickRowCount
	}

	getBrickWidth(): number {
		return this.brickWidth
	}

	getBrickHeight(): number {
		return this.brickHeight
	}

	getBricks(): IBrickObject[][] {
		return this.bricks
	}
}

export default Brick
