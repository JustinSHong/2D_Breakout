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

		expect(aboutModal).toBeTruthy()
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
	})

	test('it should have a Settings modal', () => {})

	test('it should have a Controls modal', () => {})

	test('it should have a tool bar for game controls', () => {})

	test('it should have a canvas', () => {})
})
