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

	constructor() {
		this.dx = 1.5
		this.dy = -1.5
		this.lives = 5
		this.name = 'veryEasy'
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
