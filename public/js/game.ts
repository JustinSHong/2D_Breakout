import Ball from './modules/ball'
import Brick from './modules/brick'
import Canvas, { ICanvas } from './modules/canvas'
import Paddle from './modules/paddle'
import Player from './modules/player'
import socket from './modules/client'

import { IPaddle } from './modules/paddle'
import { IPlayer } from './modules/player'

// enable live reload
document.write(
	'<script src="https://' +
		(location.host || 'localhost').split(':')[0] +
		':35729/livereload.js?snipver=1"></' +
		'script>'
)

class Game {
	public rightPressed: boolean
	public leftPressed: boolean
	public players: IPlayer[]

	constructor() {
		this.rightPressed = false
		this.leftPressed = false
		this.players = [] // holds all players in the game

		// listen for key press and key release
		window.addEventListener('keydown', this.keyDownHandler, false)
		window.addEventListener('keyup', this.keyUpHandler, false)
		// listen for mouse movement
		window.addEventListener('mousemove', this.mouseMoveHandler, false)
		// listen for changes in game mode
		easyMode!.addEventListener('click', selectGameMode, false)
		mediumMode!.addEventListener('click', selectGameMode, false)
		hardMode!.addEventListener('click', selectGameMode, false)
		veryHardMode!.addEventListener('click', selectGameMode, false)
	}

	// initialize the game objects and the game loop
	init() {
		requestAnimationFrame(() => this.draw(canvas))
	}

	// main draw function of the game - initiates game loop
	draw(canvas: ICanvas) {
		// clear previous ball before drawing a new one
		canvas.clear()
		canvas.ctx.beginPath()
		paddle.drawPaddle(canvas)
		brick.drawBricks(canvas)
		ball.drawBall(canvas)
		player.drawScore(canvas)
		player.drawLives(canvas)
		canvas.detectBrickCollisions(ball, brick, player)
		canvas.detectEdgeCollisions(ball, paddle, player)

		socket.emit('playerScored', player) // send player data to server
		socket.emit('playerLife', player)

		// move paddle right until the right edge of the canvas
		if (
			this.rightPressed &&
			paddle.paddleX < canvas.width - paddle.paddleWidth
		) {
			paddle.update(7)
		} else if (this.leftPressed && paddle.paddleX > 0) {
			paddle.update(-7)
		}
		// update ball's position
		ball.update()

		if (pause === false) {
			// animation loops
			requestAnimationFrame(() => {
				this.draw(canvas)
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

	// move paddle relative to the mouse position within canvas
	mouseMoveHandler(e: MouseEvent) {
		let relativeX = e.clientX - canvas.canvas.offsetLeft
		if (relativeX > 0 && relativeX < canvas.width) {
			paddle.paddleX = relativeX - paddle.paddleWidth / 2
		}
	}
}

// pause flag
let pause = true

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

// game mode buttons
const easyMode = document.querySelector<HTMLButtonElement>('.easy-mode-btn')
const mediumMode = document.querySelector<HTMLButtonElement>('.medium-mode-btn')
const hardMode = document.querySelector<HTMLButtonElement>('.hard-mode-btn')
const veryHardMode = document.querySelector<HTMLButtonElement>(
	'.veryHard-mode-btn'
)

function selectGameMode(e) {
	const { name } = e.target
	if (name === 'easy') {
		mode = {
			name: 'easy',
			dx: 4,
			dy: -4,
			lives: 3,
		}
		ball = new Ball(canvas.height, canvas.width, mode)
		player = new Player(mode)
		brick = new Brick()
	} else if (name === 'medium') {
		mode = {
			name: 'medium',
			dx: 6,
			dy: -6,
			lives: 3,
		}
		ball = new Ball(canvas.height, canvas.width, mode)
		player = new Player(mode)
		brick = new Brick()
	} else if (name === 'hard') {
		mode = {
			name: 'hard',
			dx: 8,
			dy: -8,
			lives: 2,
		}
		ball = new Ball(canvas.height, canvas.width, mode)
		player = new Player(mode)
		brick = new Brick()
	} else {
		mode = {
			name: 'veryHard',
			dx: 10,
			dy: -10,
			lives: 2,
		}
		ball = new Ball(canvas.height, canvas.width, mode)
		player = new Player(mode)
		brick = new Brick()
	}
}

const canvas = new Canvas()
let ball = new Ball(canvas.height, canvas.width, mode)
let brick = new Brick()
const paddle = new Paddle(canvas)
let player = new Player(mode)
const g = new Game() // instantiate a game

// store your opponent's score
socket.on('otherPlayerScore', function(data) {
	player.opponentScore = data
})

// store your opponent's life count
socket.on('otherPlayerLife', function(data) {
	player.opponentLives = data
})

g.init() // start the game loop
