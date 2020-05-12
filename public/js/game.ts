import '../css/index.css'

import Canvas, { ICanvas } from './modules/canvas'
import Paddle, { IPaddle } from './modules/paddle'

import Ball from './modules/ball'
import Brick from './modules/brick'
import { IPlayer } from './modules/player'
import Player from './modules/player'

class Game {
	public rightPressed: boolean
	public leftPressed: boolean
	public players: IPlayer[]

	constructor(public canvas: ICanvas, public paddle: IPaddle) {
		this.canvas = canvas
		this.paddle = paddle
		this.rightPressed = false
		this.leftPressed = false
		this.players = [] // holds all players in the game

		// listen for key press and key release
		window.addEventListener('keydown', this.keyDownHandler, false)
		window.addEventListener('keyup', this.keyUpHandler, false)
		// listen for mouse movement
		window.addEventListener('mousemove', this.mouseMoveHandler, false)
		// listen for changes in game mode
		gameMode?.addEventListener('change', this.selectGameMode, false)
		// list for tool bar events
		play?.addEventListener('click', this.mouseClickHandler, false)
		pauseBtn?.addEventListener('click', this.mouseClickHandler, false)
		moveLeft?.addEventListener('click', this.mouseClickHandler, false)
		moveRight?.addEventListener('click', this.mouseClickHandler, false)
	}

	// initialize the game objects and the game loop
	init() {
		requestAnimationFrame(() => this.draw(this.canvas, this.paddle))
	}

	// main draw function of the game - initiates game loop
	draw(canvas: ICanvas, paddle: IPaddle) {
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

		if (pause === false) {
			// animation loops
			requestAnimationFrame(() => {
				this.draw(canvas, paddle)
			})
		}
	}

	// check if a key was pressed
	keyDownHandler(e: KeyboardEvent) {
		if (e.keyCode === 39) {
			// right cursor key pressed
			g.rightPressed = true
		} else if (e.keyCode === 37) {
			// left cursor key pressed
			g.leftPressed = true
		} else if (e.keyCode === 80) {
			// pause key pressed
			pause = !pause
			if (pause === false) {
				g.init()
			}
		} else if (e.keyCode === 81) {
			alert('You quit. Game Over!')
			document.location.reload()
		}
	}

	// check if a key was released
	keyUpHandler(e: KeyboardEvent) {
		// reset key state to default
		if (e.keyCode === 39) {
			// right cursor key released
			g.rightPressed = false
		} else if (e.keyCode === 37) {
			// right cursor key released
			g.leftPressed = false
		}
	}

	mouseClickHandler(e: Event) {
		const { id } = <HTMLButtonElement>e?.target
		const paddle = this.paddle
		console.log('MOUSE CLICK: ', id)

		if (id === 'playBtn') {
			pause = false
			if (pause === false) {
				g.init()
			}
		} else if (id === 'pauseBtn') {
			pause = true
		} else if (id === 'moveLeftBtn') {
			paddle.update(-14)
		} else if (id === 'moveRightBtn') {
			paddle.update(14)
		}
	}

	// move paddle relative to the mouse position within canvas
	mouseMoveHandler(e: MouseEvent) {
		const canvas = this.canvas.getCanvas()
		const canvasWidth = this.canvas.getWidth()
		const paddleWidth = this.paddle.getPaddleWidth()

		let relativeX = e.clientX - canvas.offsetLeft
		if (relativeX > 0 && relativeX < canvasWidth) {
			const paddleX = relativeX - paddleWidth / 2
			this.paddle.setPaddleX(paddleX)
		}
	}

	selectGameMode(e: Event) {
		const { value } = <HTMLSelectElement>e.target
		const canvasWidth = this.canvas.getHeight()
		const canvasHeight = this.canvas.getWidth()

		if (value === 'Easy') {
			mode = {
				name: 'easy',
				dx: 4,
				dy: -4,
				lives: 3,
			}
			ball = new Ball(canvasHeight, canvasWidth, mode)
			player = new Player(mode)
			brick = new Brick()
		} else if (value === 'Medium') {
			mode = {
				name: 'medium',
				dx: 6,
				dy: -6,
				lives: 3,
			}
			ball = new Ball(canvasHeight, canvasWidth, mode)
			player = new Player(mode)
			brick = new Brick()
		} else if (value === 'Hard') {
			mode = {
				name: 'hard',
				dx: 8,
				dy: -8,
				lives: 2,
			}
			ball = new Ball(canvasHeight, canvasWidth, mode)
			player = new Player(mode)
			brick = new Brick()
		} else {
			mode = {
				name: 'veryHard',
				dx: 10,
				dy: -10,
				lives: 2,
			}
			ball = new Ball(canvasHeight, canvasWidth, mode)
			player = new Player(mode)
			brick = new Brick()
		}
	}
}

// < ===== STARTING THE GAME ===== >
export interface IGameMode {
	name: string
	dx: number
	dy: number
	lives: number
}

let mode: IGameMode = {
	name: 'very easy',
	dx: 1.5,
	dy: -1.5,
	lives: 5,
}

// pause flag
let pause = true

const gameMode = document.querySelector<HTMLSelectElement>('#gameModeSelect')

// tool bar controls
const play = document.querySelector<HTMLButtonElement>('#playBtn')
const pauseBtn = document.querySelector<HTMLButtonElement>('#pauseBtn')
const moveLeft = document.querySelector<HTMLButtonElement>('#moveLeftBtn')
const moveRight = document.querySelector<HTMLButtonElement>('#moveRightBtn')

const canvas = new Canvas()
const canvasHeight = canvas.getHeight()
const canvasWidth = canvas.getWidth()

let ball = new Ball(canvasHeight, canvasWidth, mode)
let brick = new Brick()
const paddle = new Paddle(canvas)
let player = new Player(mode)
const g = new Game(canvas, paddle) // instantiate a game

g.init() // start the game loop
