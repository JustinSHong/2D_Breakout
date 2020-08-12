const fs = require('fs')
const path = require('path')
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8')

describe('application', () => {
	beforeEach(() => {
		document.documentElement.innerHTML = html.toString()
	})

	afterEach(() => {
		jest.resetModules()
	})

	test('it should have a navigation bar', () => {
		const navBar = document.querySelector('.navbar')
		const navBarBrand = document.querySelector('.navbar-brand')
		const navBarToggler = document.querySelector('.navbar-toggler')
		const navBarItem = document.querySelectorAll('.nav-item')

		// nav bar brand
		expect(navBar).toBeTruthy()
		expect(navBarBrand).toBeTruthy()
		expect(navBarBrand instanceof HTMLAnchorElement).toBe(true)
		expect(navBarBrand?.textContent).toBe('2D Breakout')
		expect(navBarToggler).toBeTruthy()
		// nav bar item - About
		expect(navBarItem).toBeTruthy()
		expect(navBarItem.length).toBe(4)
		expect(navBarItem[0] instanceof HTMLAnchorElement).toBe(true)
		expect(navBarItem[0].textContent).toBe('About')
		expect(navBarItem[0].getAttribute('data-toggle')).toBe('modal')
		expect(navBarItem[0].getAttribute('data-target')).toBe('#aboutModal')
		// nav bar item - Controls
		expect(navBarItem[1] instanceof HTMLAnchorElement).toBe(true)
		expect(navBarItem[1].textContent).toBe('Controls')
		expect(navBarItem[1].getAttribute('data-toggle')).toBe('modal')
		expect(navBarItem[1].getAttribute('data-target')).toBe('#controlsModal')
		// nav bar item - Github Repo
		expect(navBarItem[2] instanceof HTMLAnchorElement).toBe(true)
		expect(navBarItem[2].textContent).toBe('Github Repo')
		expect(navBarItem[2].getAttribute('href')).toBe(
			'https://github.com/JustinSHong/2D_Breakout'
		)
		// nav bar item - Settings
		expect(navBarItem[3] instanceof HTMLAnchorElement).toBe(true)
		expect(navBarItem[3].textContent).toBe('Settings')
		expect(navBarItem[3].getAttribute('data-toggle')).toBe('modal')
		expect(navBarItem[3].getAttribute('data-target')).toBe('#settingsModal')
	})

	test('it should have an About modal', () => {
		const aboutModal = document.querySelector('#aboutModal')
		const header = document.querySelector('.modal-title')
		const closeButton = document.querySelector('.close')
		const body = document.querySelector('.modal-body')
		const bodyTitle = body?.children[0]
		const bodyList = body?.children[1]
		const repoLink = document.querySelector('#githubRepoLink')

		expect(aboutModal).toBeTruthy()
		expect(aboutModal?.getAttribute('id')).toBe('aboutModal')
		expect(header).toBeTruthy()
		expect(header instanceof HTMLHeadingElement).toBe(true)
		expect(header?.textContent).toBe('About')
		expect(header?.getAttribute('id')).toBe('aboutModalLabel')

		expect(closeButton).toBeTruthy()
		expect(closeButton instanceof HTMLButtonElement).toBe(true)
		expect(closeButton?.getAttribute('type')).toBe('button')
		expect(closeButton?.getAttribute('data-dismiss')).toBe('modal')

		expect(body).toBeTruthy()
		expect(bodyTitle).toBeTruthy()
		expect(bodyTitle instanceof HTMLParagraphElement).toBe(true)
		expect(bodyTitle?.textContent).toBe('A 2D break out game made with:')

		expect(bodyList).toBeTruthy()
		expect(bodyList?.children.length).toBe(4)
		expect(bodyList?.children[0]).toBeTruthy()
		expect(bodyList?.children[0] instanceof HTMLLIElement).toBe(true)
		expect(bodyList?.children[0].textContent).toBe('HTML5')
		expect(bodyList?.children[1]).toBeTruthy()
		expect(bodyList?.children[1] instanceof HTMLLIElement).toBe(true)
		expect(bodyList?.children[1].textContent).toBe('CSS3')
		expect(bodyList?.children[2]).toBeTruthy()
		expect(bodyList?.children[2] instanceof HTMLLIElement).toBe(true)
		expect(bodyList?.children[2].textContent).toBe('Typescript')
		expect(bodyList?.children[3]).toBeTruthy()
		expect(bodyList?.children[3] instanceof HTMLLIElement).toBe(true)
		expect(bodyList?.children[3].textContent).toBe('Node.js / Express')

		expect(repoLink).toBeTruthy()
		expect(repoLink?.getAttribute('href')).toBe(
			'https://github.com/JustinSHong/2D_Breakout'
		)
	})

	test('it should have a Settings modal', () => {
		const settingsModal = document.querySelector('#settingsModal')
		const header = document.querySelectorAll('.modal-title')[1]
		const closeButton = document.querySelector('.close')
		const body = document.querySelector('.form-group')
		const select = body?.children[1]

		expect(settingsModal).toBeTruthy()
		expect(settingsModal?.getAttribute('id')).toBe('settingsModal')
		expect(header).toBeTruthy()
		expect(header instanceof HTMLHeadingElement).toBe(true)
		expect(header?.textContent).toBe('Settings')

		expect(closeButton).toBeTruthy()
		expect(closeButton instanceof HTMLButtonElement).toBe(true)
		expect(closeButton?.getAttribute('type')).toBe('button')
		expect(closeButton?.getAttribute('data-dismiss')).toBe('modal')

		expect(body?.children[0]).toBeTruthy()
		expect(body?.children[0] instanceof HTMLLabelElement).toBe(true)
		expect(body?.children[0].textContent).toBe('Game Modes')
		expect(body?.children[0].getAttribute('for')).toBe('gameModeSelect')

		expect(select).toBeTruthy()
		expect(select instanceof HTMLSelectElement).toBe(true)
		expect(select?.getAttribute('name')).toBe('gameModeSelect')
		expect(select?.getAttribute('id')).toBe('gameModeSelect')

		expect(select?.children[0]).toBeTruthy()
		expect(select?.children[0] instanceof HTMLOptionElement).toBe(true)
		expect(select?.children[0].textContent).toBe('Easy')
		expect(select?.children[0].getAttribute('name')).toBe('easy')
		expect(select?.children[0].getAttribute('id')).toBe('easy-mode-btn')

		expect(select?.children[1]).toBeTruthy()
		expect(select?.children[1] instanceof HTMLOptionElement).toBe(true)
		expect(select?.children[1].textContent).toBe('Medium')
		expect(select?.children[1].getAttribute('name')).toBe('medium')
		expect(select?.children[1].getAttribute('id')).toBe('medium-mode-btn')

		expect(select?.children[2]).toBeTruthy()
		expect(select?.children[2] instanceof HTMLOptionElement).toBe(true)
		expect(select?.children[2].textContent).toBe('Hard')
		expect(select?.children[2].getAttribute('name')).toBe('hard')
		expect(select?.children[2].getAttribute('id')).toBe('hard-mode-btn')

		expect(select?.children[3]).toBeTruthy()
		expect(select?.children[3] instanceof HTMLOptionElement).toBe(true)
		expect(select?.children[3].textContent).toBe('Very Hard')
		expect(select?.children[3].getAttribute('name')).toBe('veryHard')
		expect(select?.children[3].getAttribute('id')).toBe('veryHard-mode-btn')
	})

	test('it should have a Controls modal', () => {
		const controlsModal = document.querySelector('#controlsModal')
		const controlsTable = document.querySelector('.table')
		const controlsTableHeader = controlsTable?.children[0]
		const controlsTableColOne = controlsTableHeader?.children[0].children[0]
		const controlsTableColTwo = controlsTableHeader?.children[0].children[1]
		const controlsTableBody = controlsTable?.children[1]

		expect(controlsModal).toBeTruthy()
		expect(controlsTable).toBeTruthy()
		expect(controlsTableColOne).toBeTruthy()
		expect(controlsTableColOne instanceof HTMLTableCellElement).toBe(true)
		expect(controlsTableColOne?.textContent).toContain('Key')
		expect(controlsTableColTwo).toBeTruthy()
		expect(controlsTableColTwo instanceof HTMLTableCellElement).toBe(true)
		expect(controlsTableColTwo?.textContent).toContain('Description')

		expect(controlsTableBody).toBeTruthy()
		expect(controlsTableBody?.children[0].children[0]).toBeTruthy()
		expect(controlsTableBody?.children[0].children[0].textContent).toBe('P')
		expect(controlsTableBody?.children[0].children[1]).toBeTruthy()
		expect(controlsTableBody?.children[0].children[1].textContent).toBe(
			'Pause the action'
		)
		expect(controlsTableBody?.children[1].children[0]).toBeTruthy()
		expect(controlsTableBody?.children[1].children[0].textContent).toBe('Q')
		expect(controlsTableBody?.children[1].children[1]).toBeTruthy()
		expect(controlsTableBody?.children[1].children[1].textContent).toBe(
			'Quit or Reset'
		)
		expect(controlsTableBody?.children[2].children[1]).toBeTruthy()
		expect(controlsTableBody?.children[2].children[1].textContent).toBe(
			'Move paddle left with back arrow'
		)
		expect(controlsTableBody?.children[3].children[1]).toBeTruthy()
		expect(controlsTableBody?.children[3].children[1].textContent).toBe(
			'Move paddle right with right arrow'
		)
		expect(controlsTableBody?.children[4].children[1]).toBeTruthy()
		expect(
			controlsTableBody?.children[4].children[1].textContent
		).toContain('Move paddle left and right with mouse')
	})

	test('it should have a tool bar for game controls', () => {
		const toolBar = document.querySelector('.btn-toolbar')
		const playBtn = toolBar?.children[0]
		const pauseBtn = toolBar?.children[1]
		const resetBtn = toolBar?.children[2]
		const moveLeftBtn = toolBar?.children[3]
		const moveRightBtn = toolBar?.children[4]

		expect(toolBar).toBeTruthy()
		expect(toolBar?.getAttribute('role')).toBe('toolbar')

		expect(playBtn).toBeTruthy()
		expect(playBtn instanceof HTMLButtonElement).toBe(true)
		expect(playBtn?.textContent).toContain('Play')
		expect(playBtn?.getAttribute('type')).toBe('button')

		expect(pauseBtn).toBeTruthy()
		expect(pauseBtn instanceof HTMLButtonElement).toBe(true)
		expect(pauseBtn?.textContent).toContain('Pause')
		expect(pauseBtn?.getAttribute('type')).toBe('button')

		expect(resetBtn).toBeTruthy()
		expect(resetBtn instanceof HTMLButtonElement).toBe(true)
		expect(resetBtn?.textContent).toContain('Reset')
		expect(resetBtn?.getAttribute('type')).toBe('button')

		expect(moveLeftBtn).toBeTruthy()
		expect(moveLeftBtn instanceof HTMLButtonElement).toBe(true)
		expect(moveLeftBtn?.textContent).toContain('Move Left')
		expect(moveLeftBtn?.getAttribute('type')).toBe('button')

		expect(moveRightBtn).toBeTruthy()
		expect(moveRightBtn instanceof HTMLButtonElement).toBe(true)
		expect(moveRightBtn?.textContent).toContain('Move Right')
		expect(moveRightBtn?.getAttribute('type')).toBe('button')
	})

	test('it should have a canvas', () => {
		const canvas = document.getElementsByTagName('canvas')[0]

		expect(canvas).toBeTruthy()
		expect(canvas.getAttribute('id')).toBe('myCanvas')
		expect(canvas.getAttribute('width')).toBe('900')
		expect(canvas.getAttribute('height')).toBe('550')
	})

	test('it should have a table to show user scores', () => {
		const table = document.getElementById('scoreBoard')
		const tableHead = table?.children[0]
		const tableBody = table?.children[1]

		// table headers
		expect(table).toBeTruthy()
		expect(tableHead).toBeTruthy()
		expect(tableHead?.children[0].children[0]).toBeTruthy()
		expect(tableHead?.children[0].children[0].textContent).toBe('Attempts')
		expect(tableHead?.children[0].children[1]).toBeTruthy()
		expect(tableHead?.children[0].children[1].textContent).toBe('Score')
		expect(tableHead?.children[0].children[2]).toBeTruthy()
		expect(tableHead?.children[0].children[2].textContent).toBe('Mode')
		expect(tableHead?.children[0].children[3]).toBeTruthy()
		expect(tableHead?.children[0].children[3].textContent).toBe('Timestamp')

		// example entry
		expect(tableBody).toBeTruthy()
		expect(tableBody?.children[0].children[0]).toBeTruthy()
		expect(tableBody?.children[0].children[0].textContent).toBe('0')
		expect(tableBody?.children[0].children[1]).toBeTruthy()
		expect(tableBody?.children[0].children[1].textContent).toBe(
			'Your score'
		)
		expect(tableBody?.children[0].children[2]).toBeTruthy()
		expect(tableBody?.children[0].children[2].textContent).toBe(
			'Mode you played'
		)
		expect(tableBody?.children[0].children[3]).toBeTruthy()
		expect(tableBody?.children[0].children[3].textContent).toBe(
			'When you played'
		)
	})
})
