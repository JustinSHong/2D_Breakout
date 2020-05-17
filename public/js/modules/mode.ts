export interface IGameMode {
	getMode(): IMode
	setMode(mode: IMode): void
}

export interface IMode {
	dx: number
	dy: number
	lives: number
	name: string
}

class Mode {
	private dx: number
	private dy: number
	private lives: number
	private name: string

	constructor(mode: IMode) {
		this.dx = mode.dx
		this.dy = mode.dy
		this.lives = mode.lives
		this.name = mode.name
	}

	public getMode(): IMode {
		return {
			dx: this.dx,
			dy: this.dy,
			lives: this.lives,
			name: this.name,
		}
	}

	public setMode(mode: IMode): void {
		const { dx, dy, lives, name } = mode

		this.dx = dx
		this.dy = dy
		this.lives = lives
		this.name = name
	}
}

export default Mode
