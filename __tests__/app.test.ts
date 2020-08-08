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
		// nav bar items
		expect(navBarItem).toBeTruthy()
		expect(navBarItem.length).toBe(4)
		expect(navBarItem[0] instanceof HTMLAnchorElement).toBe(true)
		expect(navBarItem[0].textContent).toBe('About')
		expect(navBarItem[0].getAttribute('data-toggle')).toBe('modal')
		expect(navBarItem[0].getAttribute('data-target')).toBe('#aboutModal')

		expect(navBarItem[1] instanceof HTMLAnchorElement).toBe(true)
		expect(navBarItem[1].textContent).toBe('Controls')
		expect(navBarItem[1].getAttribute('data-toggle')).toBe('modal')
		expect(navBarItem[1].getAttribute('data-target')).toBe('#controlsModal')

		expect(navBarItem[2] instanceof HTMLAnchorElement).toBe(true)
		expect(navBarItem[2].textContent).toBe('Github Repo')
		expect(navBarItem[2].getAttribute('href')).toBe(
			'https://github.com/JustinSHong/2D_Breakout'
		)

		expect(navBarItem[3] instanceof HTMLAnchorElement).toBe(true)
		expect(navBarItem[3].textContent).toBe('Settings')
		expect(navBarItem[3].getAttribute('data-toggle')).toBe('modal')
		expect(navBarItem[3].getAttribute('data-target')).toBe('#settingsModal')
	})

	test('it should have a tool bar for game controls', () => {})

	test('it should have a canvas', () => {})
})
