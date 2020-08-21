// game modes
export const easyMode = {
	name: 'easy',
	dx: 2,
	dy: -2,
	lives: 5,
}

export const mediumMode = {
	name: 'medium',
	dx: 2.5,
	dy: -2.5,
	lives: 4,
}

export const hardMode = {
	name: 'hard',
	dx: 3,
	dy: -3,
	lives: 3,
}

export const veryHardMode = {
	name: 'veryHard',
	dx: 3.5,
	dy: -3.5,
	lives: 4,
}

export const veryEasyMode = {
	dx: 1.5,
	dy: -1.5,
	lives: 5,
	name: 'veryEasy',
}

// modals
export const aboutModalLink = document.querySelector<HTMLAnchorElement>(
	'#aboutModalLink'
)
export const controlsModalLink = document.querySelector<HTMLAnchorElement>(
	'#controlsModalLink'
)
export const gameModeSelect = document.querySelector<HTMLSelectElement>(
	'#gameModeSelect'
)
export const settingsModalLink = document.querySelector<HTMLAnchorElement>(
	'#settingsModalLink'
)
export const gameEndModalTitle = document.querySelector<HTMLDivElement>(
	'#gameEndModalTitle'
)
export const gameEndModalBody = document.querySelector<HTMLDivElement>(
	'#gameEndModalBody'
)

// tool bar controls
export const playBtn = document.querySelector<HTMLButtonElement>('#playBtn')
export const pauseBtn = document.querySelector<HTMLButtonElement>('#pauseBtn')
export const resetBtn = document.querySelector<HTMLButtonElement>('#resetBtn')
export const moveLeftBtn = document.querySelector<HTMLButtonElement>(
	'#moveLeftBtn'
)
export const moveRightBtn = document.querySelector<HTMLButtonElement>(
	'#moveRightBtn'
)

// themes

// --charcoal: #264653ff;
// --persian-green: #2a9d8fff;
// --orange-yellow-crayola: #e9c46aff;
// --sandy-brown: #f4a261ff;
// --burnt-sienna: #e76f51ff;

const pastelOne = {
	navBarStyle: 'background-color: #2a9d8fff !important',
	modalHeaderStyle: 'background-color: #e76f51ff !important',
	modalBodyStyle: 'background-color: #264653ff',
	bodyStyle: 'background-color: #264653ff',
	buttonStyle:
		'background-color: #e76f51ff !important; border-color: #e76f51ff !important',
	tableHeaderStyle: 'background-color: #e76f51ff',
}

// --imperial-red: #e63946ff;
// --honeydew: #f1faeeff;
// --powder-blue: #a8dadcff;
// --celadon-blue: #457b9dff;
// --prussian-blue: #1d3557ff;

const pastelTwo = {
	navBarStyle: 'background-color: #a8dadcff !important',
	navBarLinkStyle: 'color: #000 !important',
	modalHeaderStyle: 'background-color: #e63946ff !important',
	modalBodyStyle: 'background-color: #1d3557ff',
	bodyStyle: 'background-color: #1d3557ff',
	buttonStyle:
		'background-color: #e63946ff !important; border-color: #e63946ff !important',
	tableHeaderStyle: 'background-color: #e63946ff',
}

// --prussian-blue: #003049ff;
// --maximum-red: #d62828ff;
// --orange: #f77f00ff;
// --maximum-yellow-red: #fcbf49ff;
// --lemon-meringue: #eae2b7ff;

const pastelThree = {
	navBarStyle: 'background-color: #fcbf49ff !important',
	navBarLinkStyle: 'color: #000 !important',
	modalHeaderStyle: 'background-color: #d62828ff !important',
	modalBodyStyle: 'background-color: #003049ff',
	bodyStyle: 'background-color: #003049ff',
	buttonStyle:
		'background-color: #d62828ff !important; border-color: #d62828ff',
	tableHeaderStyle: 'background-color: #d62828ff',
}

export const pastelDict: { [id: string]: { [id: string]: string } } = {
	pastelOneRadio: pastelOne,
	pastelTwoRadio: pastelTwo,
	pastelThreeRadio: pastelThree,
}

// theme inputs
export const numberOfThemes = document.querySelectorAll<HTMLInputElement>(
	'[type=radio]'
).length
export const pastelOneRadio = document.querySelector<HTMLInputElement>(
	'#pastelOneRadio'
)
export const pastelTwoRadio = document.querySelector<HTMLInputElement>(
	'#pastelTwoRadio'
)
export const pastelThreeRadio = document.querySelector<HTMLInputElement>(
	'#pastelThreeRadio'
)
