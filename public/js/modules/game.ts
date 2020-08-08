import $ from 'jquery'
import Ball, { IBall } from './ball'
import { easyMode, hardMode, mediumMode, veryHardMode } from '../constants'

import { IBrick } from './brick'
import { ICanvas } from './canvas'
import { IGameMode } from './mode'
import { IPaddle } from './paddle'
import { IPlayer } from './player'
import Player from './player'

// modal links
const controlsModalLink = document.querySelector<HTMLAnchorElement>(
	'#controlsModalLink'
)
const gameMode = document.querySelector<HTMLSelectElement>('#gameModeSelect')
const settingsModalLink = document.querySelector<HTMLAnchorElement>(
	'#settingsModalLink'
)
// tool bar controls
const play = document.querySelector<HTMLButtonElement>('#playBtn')
const pauseBtn = document.querySelector<HTMLButtonElement>('#pauseBtn')
const reset = document.querySelector<HTMLButtonElement>('#resetBtn')
const moveLeft = document.querySelector<HTMLButtonElement>('#moveLeftBtn')
const moveRight = document.querySelector<HTMLButtonElement>('#moveRightBtn')

class Game {
	private rightPressed: boolean
	private leftPressed: boolean
	private pause: boolean
	private playPressed: boolean
	private requestId: number

	constructor(
		public ball: IBall,
		public brick: IBrick,
		public canvas: ICanvas,
		public mode: IGameMode,
		public paddle: IPaddle,
		public player: IPlayer
	) {
		this.ball = ball
		this.brick = brick
		this.canvas = canvas
		this.paddle = paddle
		this.rightPressed = false
		this.leftPressed = false
		this.mode = mode
		this.player = player
		this.playPressed = false
		this.pause = true
		this.requestId = 0

		// listen for key press and key release
		window.addEventListener('keydown', this.keyDownHandler, false)
		window.addEventListener('keyup', this.keyUpHandler, false)
		// listen for mouse movement
		window.addEventListener('mousemove', this.mouseMoveHandler, false)
		// listen for clicks on modal links
		controlsModalLink?.addEventListener(
			'click',
			this.mouseClickHandler,
			false
		)
		gameMode?.addEventListener('change', this.selectGameMode, false)
		settingsModalLink?.addEventListener(
			'click',
			this.mouseClickHandler,
			false
		)
		// modals opening or closing
		$('#controlsModal').on('hidden.bs.modal', () => {
			this.resumeGame()
		})
		$('#settingsModal').on('hidden.bs.modal', () => {
			this.resumeGame()
		})
		// list for tool bar events
		play?.addEventListener('click', this.mouseClickHandler, false)
		pauseBtn?.addEventListener('click', this.mouseClickHandler, false)
		reset?.addEventListener('click', this.mouseClickHandler, false)
		moveLeft?.addEventListener('click', this.mouseClickHandler, false)
		moveRight?.addEventListener('click', this.mouseClickHandler, false)
	}

	// initialize the game objects and the game loop
	public init(): void {
		this.requestId = requestAnimationFrame(() =>
			this.draw(
				this.ball,
				this.brick,
				this.canvas,
				this.paddle,
				this.player
			)
		)
	}

	// main draw function of the game - initiates game loop
	public draw(
		ball: IBall,
		brick: IBrick,
		canvas: ICanvas,
		paddle: IPaddle,
		player: IPlayer
	): void {
		const paddleX = paddle.getPaddleX()
		const paddleWidth = paddle.getPaddleWidth()
		// clear previous ball before drawing a new one
		canvas.clear()
		canvas.getCtx().beginPath()
		paddle.drawPaddle(canvas)
		brick.drawBricks(canvas)
		ball.drawBall(canvas)
		player.drawScore(canvas)
		player.drawLives(canvas)
		this.drawCurrentGameMode(this.mode)
		canvas.detectBrickCollisions(ball, brick, player)
		canvas.detectEdgeCollisions(ball, paddle, player)

		// move paddle right until the right edge of the canvas
		if (this.rightPressed && paddleX < canvas.getWidth() - paddleWidth) {
			paddle.update(7)
		} else if (this.leftPressed && paddleX > 0) {
			paddle.update(-7)
		}
		// update ball's position
		ball.update()

		if (this.pause === false) {
			// animation loops
			this.requestId = requestAnimationFrame(() => {
				this.draw(
					this.ball,
					this.brick,
					this.canvas,
					this.paddle,
					this.player
				)
			})
		} else {
			cancelAnimationFrame(this.requestId)
		}
	}

	public drawCurrentGameMode(mode: IGameMode): void {
		const ctx = this.canvas.getCtx()
		const canvasWidth = this.canvas.getWidth()
		ctx.font = '24px Arial'
		ctx.fillStyle = '#0095DD'
		ctx.fillText('Mode: ' + mode.getMode().name, canvasWidth / 2 - 90, 20)
	}

	// check if a key was pressed
	public keyDownHandler = (e: KeyboardEvent): number => {
		if (e.keyCode === 39) {
			// right cursor key pressed
			this.rightPressed = true
		} else if (e.keyCode === 37) {
			// left cursor key pressed
			this.leftPressed = true
		} else if (e.keyCode === 80) {
			// pause key pressed
			this.pauseGame()
		} else if (e.keyCode === 81) {
			alert('You quit. Game Over!')
			document.location.reload()
		}

		return e.keyCode
	}

	// check if a key was released
	public keyUpHandler = (e: KeyboardEvent): number => {
		// reset key state to default
		if (e.keyCode === 39) {
			// right cursor key released
			this.rightPressed = false
		} else if (e.keyCode === 37) {
			// right cursor key released
			this.leftPressed = false
		}

		return e.keyCode
	}

	public mouseClickHandler = (e: Event): string => {
		const { id } = <HTMLElement>e?.target
		const paddle = this.paddle

		if (id === 'playBtn') {
			this.resumeGame()
		} else if (id === 'pauseBtn') {
			this.pauseGame()
		} else if (id === 'moveLeftBtn') {
			paddle.update(-14)
		} else if (id === 'moveRightBtn') {
			paddle.update(14)
		} else if (id === 'resetBtn') {
			document.location.reload()
		} else if (id === 'settingsModalLink') {
			this.pauseGame()
		} else if (id === 'controlsModalLink') {
			this.pauseGame()
		}

		return id
	}

	// move paddle relative to the mouse position within canvas
	public mouseMoveHandler = (e: MouseEvent): void => {
		const canvas = this.canvas.getCanvas()
		const canvasWidth = this.canvas.getWidth()
		const paddleWidth = this.paddle.getPaddleWidth()

		let relativeX = e.clientX - canvas.offsetLeft
		if (relativeX > 0 && relativeX < canvasWidth) {
			const paddleX = relativeX - paddleWidth / 2
			this.paddle.setPaddleX(paddleX)
		}
	}

	public pauseGame = (): boolean => {
		this.pause = true
		this.playPressed = false
		return this.pause
	}

	public resumeGame = (): boolean => {
		this.pause = false
		if (!this.playPressed) {
			this.init()
		} else {
			console.log('play btn was already pressed')
		}
		this.playPressed = true
		return this.pause
	}

	public selectGameMode = (e: Event): IGameMode => {
		const { value } = <HTMLSelectElement>e.target
		const canvasWidth = this.canvas.getHeight()
		const canvasHeight = this.canvas.getWidth()

		if (value === 'Easy') {
			this.mode.setMode(easyMode)
		} else if (value === 'Medium') {
			this.mode.setMode(mediumMode)
		} else if (value === 'Hard') {
			this.mode.setMode(hardMode)
		} else if (value === 'Very Hard') {
			this.mode.setMode(veryHardMode)
		}

		this.ball = new Ball(canvasHeight, canvasWidth, this.mode)
		this.player = new Player(this.mode)

		return this.mode
	}
}

export default Game
