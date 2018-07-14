/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/js/game.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/js/game.js":
/*!***************************!*\
  !*** ./public/js/game.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var io = this.io();\n\nconst canvas = document.getElementById(\"myCanvas\");\nconst ctx = canvas.getContext(\"2d\");\n\nlet lives = 3;\n\nlet score = 0;\n\nconst ballRadius = 10;\n\n// starting point for the ball\nlet x = canvas.height - 30;\nlet y = canvas.width / 2;\n\n// values that x and y will change by each frame\nlet dx = 2;\nlet dy = -2;\n\n// paddle dimensions\nconst paddleHeight = 10;\nconst paddleWidth = 75;\nlet paddleX = (canvas.width - paddleWidth) / 2; // starting point of the paddle\n\n// pressed buttons states\nlet rightPressed = false;\nlet leftPressed = false;\n\n// listen for key press and key release\ndocument.addEventListener(\"keydown\", keyDownHandler, false);\ndocument.addEventListener(\"keyup\", keyUpHandler, false);\n// listen for mouse movement\ndocument.addEventListener(\"mousemove\", mouseMoveHandler, false);\n\nconst brickRowCount = 3;\nconst brickColumnCount = 5;\nconst brickWidth = 75;\nconst brickHeight = 20;\nconst brickPadding = 10;\nconst brickOffsetTop = 30;\nconst brickOffsetLeft = 30;\n\nconst bricks = [];\nfor (let col = 0; col < brickColumnCount; col++) {\n\tbricks[col] = [];\n\tfor (let row = 0; row < brickRowCount; row++) {\n\t\tbricks[col][row] = { x: 0, y: 0, status: 1 }; // default brick properties\n\t}\n}\n\nfunction mouseMoveHandler(e) {\n\tlet relativeX = e.clientX - canvas.offsetLeft;\n\tif (relativeX > 0 && relativeX < canvas.width) {\n\t\tpaddleX = relativeX - paddleWidth / 2;\n\t}\n}\n\nfunction keyDownHandler(e) {\n\tif (e.keyCode === 39) {\n\t\t// right cursor key pressed\n\t\trightPressed = true;\n\t} else if (e.keyCode === 37) {\n\t\t// left cursor key pressed\n\t\tleftPressed = true;\n\t}\n}\n\nfunction keyUpHandler(e) {\n\t// reset key state to default\n\tif (e.keyCode === 39) {\n\t\t// right cursor key released\n\t\trightPressed = false;\n\t} else if (e.keyCode === 37) {\n\t\t// right cursor key released\n\t\tleftPressed = false;\n\t}\n}\n\nfunction collisionDetection() {\n\t// compare position of bricks with the ball for every frame\n\tfor (let col = 0; col < brickColumnCount; col++) {\n\t\tfor (let row = 0; row < brickRowCount; row++) {\n\t\t\tlet brick = bricks[col][row];\n\t\t\t// a collision with a brick occurs when the center of the ball is inside a brick's coordinates\n\t\t\t// if a collision occurs, change the movement of the ball, a brick's status, score\n\t\t\tif (brick.status === 1) {\n\t\t\t\tif (\n\t\t\t\t\tx > brick.x && // x position of the ball is greater than the x position of the brick\n\t\t\t\t\tx < brick.x + brickWidth && // x position of the ball is less than the x position of the brick plus its width\n\t\t\t\t\ty > brick.y && // y position of the ball is greater than the y position of the brick\n\t\t\t\t\ty < brick.y + brickHeight // y position of the ball is less than the y position of the brick plus its height\n\t\t\t\t) {\n\t\t\t\t\tdy = -dy;\n\t\t\t\t\tbrick.status = 0;\n\t\t\t\t\tscore++;\n\t\t\t\t\tif (score == brickRowCount * brickColumnCount) {\n\t\t\t\t\t\t// display winning msg when score is equal to the number of bricks\n\t\t\t\t\t\talert(\"You Win! Congrats!\");\n\t\t\t\t\t\tdocument.location.reload();\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n}\n\nfunction drawLives() {\n\tctx.font = \"16px Arial\";\n\tctx.fillStyle = \"#0095DD\";\n\tctx.fillText(\"Lives: \" + lives, canvas.width - 65, 20);\n}\n\nfunction drawScore() {\n\tctx.font = \"16px Arial\";\n\tctx.fillStyle = \"#0095DD\";\n\tctx.fillText(\"Score: \" + score, 8, 20);\n}\n\nfunction drawBricks() {\n\tfor (let col = 0; col < brickColumnCount; col++) {\n\t\tfor (let row = 0; row < brickRowCount; row++) {\n\t\t\tif (bricks[col][row].status === 1) {\n\t\t\t\t// ball did not collide with brick\n\t\t\t\tlet brickX = col * (brickWidth + brickPadding) + brickOffsetLeft;\n\t\t\t\tlet brickY = row * (brickHeight + brickPadding) + brickOffsetTop;\n\t\t\t\tbricks[col][row].x = brickX;\n\t\t\t\tbricks[col][row].y = brickY;\n\t\t\t\tctx.beginPath();\n\t\t\t\tctx.rect(brickX, brickY, brickWidth, brickHeight);\n\t\t\t\tctx.fillStyle = \"#0095DD\";\n\t\t\t\tctx.fill();\n\t\t\t\tctx.closePath();\n\t\t\t}\n\t\t}\n\t}\n}\n\nfunction drawBall() {\n\tctx.beginPath();\n\tctx.arc(x, y, ballRadius, 0, Math.PI * 2);\n\tctx.fillStyle = \"#0095DD\";\n\tctx.fill();\n\tctx.closePath();\n}\n\nfunction drawPaddle() {\n\tctx.beginPath();\n\tctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);\n\tctx.fillStyle = \"#0095DD\";\n\tctx.fill();\n\tctx.closePath();\n}\n\nfunction draw() {\n\t// clear previous ball before drawing a new one\n\tctx.clearRect(0, 0, canvas.width, canvas.height);\n\tdrawBricks();\n\tdrawBall();\n\tdrawPaddle();\n\tdrawScore();\n\tdrawLives();\n\tcollisionDetection();\n\t// detect collisions with top edge\n\tif (y + dy < ballRadius) {\n\t\tdy = -dy;\n\t} else if (y + dy > canvas.height - ballRadius) {\n\t\tif (x > paddleX && x < paddleX + paddleWidth) {\n\t\t\t// ball collides with the paddle\n\t\t\tdy = -dy;\n\t\t} else {\n\t\t\tlives--;\n\t\t\tif (lives === 0) {\n\t\t\t\talert(\"Game Over\");\n\t\t\t\tdocument.location.reload();\n\t\t\t} else {\n\t\t\t\tx = canvas.width / 2;\n\t\t\t\ty = canvas.height - 30;\n\t\t\t\tdx = 2;\n\t\t\t\tdy = -2;\n\t\t\t\tpaddleX = (canvas.width - paddleWidth) / 2;\n\t\t\t}\n\t\t}\n\t}\n\t// detect collision with left and right edges\n\tif (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {\n\t\tdx = -dx;\n\t}\n\t// move paddle right until the right edge of the canvas\n\tif (rightPressed && paddleX < canvas.width - paddleWidth) {\n\t\tpaddleX += 7;\n\t} else if (leftPressed && paddleX > 0) {\n\t\t// move paddle left until the left edge of the canvas\n\t\tpaddleX -= 7;\n\t}\n\t// increment x and y\n\tx += dx;\n\ty += dy;\n\n\trequestAnimationFrame(draw); // animation loops\n}\n\ndraw();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wdWJsaWMvanMvZ2FtZS5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3B1YmxpYy9qcy9nYW1lLmpzPzUzMTQiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGlvID0gdGhpcy5pbygpO1xuXG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Q2FudmFzXCIpO1xuY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxubGV0IGxpdmVzID0gMztcblxubGV0IHNjb3JlID0gMDtcblxuY29uc3QgYmFsbFJhZGl1cyA9IDEwO1xuXG4vLyBzdGFydGluZyBwb2ludCBmb3IgdGhlIGJhbGxcbmxldCB4ID0gY2FudmFzLmhlaWdodCAtIDMwO1xubGV0IHkgPSBjYW52YXMud2lkdGggLyAyO1xuXG4vLyB2YWx1ZXMgdGhhdCB4IGFuZCB5IHdpbGwgY2hhbmdlIGJ5IGVhY2ggZnJhbWVcbmxldCBkeCA9IDI7XG5sZXQgZHkgPSAtMjtcblxuLy8gcGFkZGxlIGRpbWVuc2lvbnNcbmNvbnN0IHBhZGRsZUhlaWdodCA9IDEwO1xuY29uc3QgcGFkZGxlV2lkdGggPSA3NTtcbmxldCBwYWRkbGVYID0gKGNhbnZhcy53aWR0aCAtIHBhZGRsZVdpZHRoKSAvIDI7IC8vIHN0YXJ0aW5nIHBvaW50IG9mIHRoZSBwYWRkbGVcblxuLy8gcHJlc3NlZCBidXR0b25zIHN0YXRlc1xubGV0IHJpZ2h0UHJlc3NlZCA9IGZhbHNlO1xubGV0IGxlZnRQcmVzc2VkID0gZmFsc2U7XG5cbi8vIGxpc3RlbiBmb3Iga2V5IHByZXNzIGFuZCBrZXkgcmVsZWFzZVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwga2V5RG93bkhhbmRsZXIsIGZhbHNlKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBrZXlVcEhhbmRsZXIsIGZhbHNlKTtcbi8vIGxpc3RlbiBmb3IgbW91c2UgbW92ZW1lbnRcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgbW91c2VNb3ZlSGFuZGxlciwgZmFsc2UpO1xuXG5jb25zdCBicmlja1Jvd0NvdW50ID0gMztcbmNvbnN0IGJyaWNrQ29sdW1uQ291bnQgPSA1O1xuY29uc3QgYnJpY2tXaWR0aCA9IDc1O1xuY29uc3QgYnJpY2tIZWlnaHQgPSAyMDtcbmNvbnN0IGJyaWNrUGFkZGluZyA9IDEwO1xuY29uc3QgYnJpY2tPZmZzZXRUb3AgPSAzMDtcbmNvbnN0IGJyaWNrT2Zmc2V0TGVmdCA9IDMwO1xuXG5jb25zdCBicmlja3MgPSBbXTtcbmZvciAobGV0IGNvbCA9IDA7IGNvbCA8IGJyaWNrQ29sdW1uQ291bnQ7IGNvbCsrKSB7XG5cdGJyaWNrc1tjb2xdID0gW107XG5cdGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IGJyaWNrUm93Q291bnQ7IHJvdysrKSB7XG5cdFx0YnJpY2tzW2NvbF1bcm93XSA9IHsgeDogMCwgeTogMCwgc3RhdHVzOiAxIH07IC8vIGRlZmF1bHQgYnJpY2sgcHJvcGVydGllc1xuXHR9XG59XG5cbmZ1bmN0aW9uIG1vdXNlTW92ZUhhbmRsZXIoZSkge1xuXHRsZXQgcmVsYXRpdmVYID0gZS5jbGllbnRYIC0gY2FudmFzLm9mZnNldExlZnQ7XG5cdGlmIChyZWxhdGl2ZVggPiAwICYmIHJlbGF0aXZlWCA8IGNhbnZhcy53aWR0aCkge1xuXHRcdHBhZGRsZVggPSByZWxhdGl2ZVggLSBwYWRkbGVXaWR0aCAvIDI7XG5cdH1cbn1cblxuZnVuY3Rpb24ga2V5RG93bkhhbmRsZXIoZSkge1xuXHRpZiAoZS5rZXlDb2RlID09PSAzOSkge1xuXHRcdC8vIHJpZ2h0IGN1cnNvciBrZXkgcHJlc3NlZFxuXHRcdHJpZ2h0UHJlc3NlZCA9IHRydWU7XG5cdH0gZWxzZSBpZiAoZS5rZXlDb2RlID09PSAzNykge1xuXHRcdC8vIGxlZnQgY3Vyc29yIGtleSBwcmVzc2VkXG5cdFx0bGVmdFByZXNzZWQgPSB0cnVlO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGtleVVwSGFuZGxlcihlKSB7XG5cdC8vIHJlc2V0IGtleSBzdGF0ZSB0byBkZWZhdWx0XG5cdGlmIChlLmtleUNvZGUgPT09IDM5KSB7XG5cdFx0Ly8gcmlnaHQgY3Vyc29yIGtleSByZWxlYXNlZFxuXHRcdHJpZ2h0UHJlc3NlZCA9IGZhbHNlO1xuXHR9IGVsc2UgaWYgKGUua2V5Q29kZSA9PT0gMzcpIHtcblx0XHQvLyByaWdodCBjdXJzb3Iga2V5IHJlbGVhc2VkXG5cdFx0bGVmdFByZXNzZWQgPSBmYWxzZTtcblx0fVxufVxuXG5mdW5jdGlvbiBjb2xsaXNpb25EZXRlY3Rpb24oKSB7XG5cdC8vIGNvbXBhcmUgcG9zaXRpb24gb2YgYnJpY2tzIHdpdGggdGhlIGJhbGwgZm9yIGV2ZXJ5IGZyYW1lXG5cdGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IGJyaWNrQ29sdW1uQ291bnQ7IGNvbCsrKSB7XG5cdFx0Zm9yIChsZXQgcm93ID0gMDsgcm93IDwgYnJpY2tSb3dDb3VudDsgcm93KyspIHtcblx0XHRcdGxldCBicmljayA9IGJyaWNrc1tjb2xdW3Jvd107XG5cdFx0XHQvLyBhIGNvbGxpc2lvbiB3aXRoIGEgYnJpY2sgb2NjdXJzIHdoZW4gdGhlIGNlbnRlciBvZiB0aGUgYmFsbCBpcyBpbnNpZGUgYSBicmljaydzIGNvb3JkaW5hdGVzXG5cdFx0XHQvLyBpZiBhIGNvbGxpc2lvbiBvY2N1cnMsIGNoYW5nZSB0aGUgbW92ZW1lbnQgb2YgdGhlIGJhbGwsIGEgYnJpY2sncyBzdGF0dXMsIHNjb3JlXG5cdFx0XHRpZiAoYnJpY2suc3RhdHVzID09PSAxKSB7XG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHR4ID4gYnJpY2sueCAmJiAvLyB4IHBvc2l0aW9uIG9mIHRoZSBiYWxsIGlzIGdyZWF0ZXIgdGhhbiB0aGUgeCBwb3NpdGlvbiBvZiB0aGUgYnJpY2tcblx0XHRcdFx0XHR4IDwgYnJpY2sueCArIGJyaWNrV2lkdGggJiYgLy8geCBwb3NpdGlvbiBvZiB0aGUgYmFsbCBpcyBsZXNzIHRoYW4gdGhlIHggcG9zaXRpb24gb2YgdGhlIGJyaWNrIHBsdXMgaXRzIHdpZHRoXG5cdFx0XHRcdFx0eSA+IGJyaWNrLnkgJiYgLy8geSBwb3NpdGlvbiBvZiB0aGUgYmFsbCBpcyBncmVhdGVyIHRoYW4gdGhlIHkgcG9zaXRpb24gb2YgdGhlIGJyaWNrXG5cdFx0XHRcdFx0eSA8IGJyaWNrLnkgKyBicmlja0hlaWdodCAvLyB5IHBvc2l0aW9uIG9mIHRoZSBiYWxsIGlzIGxlc3MgdGhhbiB0aGUgeSBwb3NpdGlvbiBvZiB0aGUgYnJpY2sgcGx1cyBpdHMgaGVpZ2h0XG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdGR5ID0gLWR5O1xuXHRcdFx0XHRcdGJyaWNrLnN0YXR1cyA9IDA7XG5cdFx0XHRcdFx0c2NvcmUrKztcblx0XHRcdFx0XHRpZiAoc2NvcmUgPT0gYnJpY2tSb3dDb3VudCAqIGJyaWNrQ29sdW1uQ291bnQpIHtcblx0XHRcdFx0XHRcdC8vIGRpc3BsYXkgd2lubmluZyBtc2cgd2hlbiBzY29yZSBpcyBlcXVhbCB0byB0aGUgbnVtYmVyIG9mIGJyaWNrc1xuXHRcdFx0XHRcdFx0YWxlcnQoXCJZb3UgV2luISBDb25ncmF0cyFcIik7XG5cdFx0XHRcdFx0XHRkb2N1bWVudC5sb2NhdGlvbi5yZWxvYWQoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gZHJhd0xpdmVzKCkge1xuXHRjdHguZm9udCA9IFwiMTZweCBBcmlhbFwiO1xuXHRjdHguZmlsbFN0eWxlID0gXCIjMDA5NUREXCI7XG5cdGN0eC5maWxsVGV4dChcIkxpdmVzOiBcIiArIGxpdmVzLCBjYW52YXMud2lkdGggLSA2NSwgMjApO1xufVxuXG5mdW5jdGlvbiBkcmF3U2NvcmUoKSB7XG5cdGN0eC5mb250ID0gXCIxNnB4IEFyaWFsXCI7XG5cdGN0eC5maWxsU3R5bGUgPSBcIiMwMDk1RERcIjtcblx0Y3R4LmZpbGxUZXh0KFwiU2NvcmU6IFwiICsgc2NvcmUsIDgsIDIwKTtcbn1cblxuZnVuY3Rpb24gZHJhd0JyaWNrcygpIHtcblx0Zm9yIChsZXQgY29sID0gMDsgY29sIDwgYnJpY2tDb2x1bW5Db3VudDsgY29sKyspIHtcblx0XHRmb3IgKGxldCByb3cgPSAwOyByb3cgPCBicmlja1Jvd0NvdW50OyByb3crKykge1xuXHRcdFx0aWYgKGJyaWNrc1tjb2xdW3Jvd10uc3RhdHVzID09PSAxKSB7XG5cdFx0XHRcdC8vIGJhbGwgZGlkIG5vdCBjb2xsaWRlIHdpdGggYnJpY2tcblx0XHRcdFx0bGV0IGJyaWNrWCA9IGNvbCAqIChicmlja1dpZHRoICsgYnJpY2tQYWRkaW5nKSArIGJyaWNrT2Zmc2V0TGVmdDtcblx0XHRcdFx0bGV0IGJyaWNrWSA9IHJvdyAqIChicmlja0hlaWdodCArIGJyaWNrUGFkZGluZykgKyBicmlja09mZnNldFRvcDtcblx0XHRcdFx0YnJpY2tzW2NvbF1bcm93XS54ID0gYnJpY2tYO1xuXHRcdFx0XHRicmlja3NbY29sXVtyb3ddLnkgPSBicmlja1k7XG5cdFx0XHRcdGN0eC5iZWdpblBhdGgoKTtcblx0XHRcdFx0Y3R4LnJlY3QoYnJpY2tYLCBicmlja1ksIGJyaWNrV2lkdGgsIGJyaWNrSGVpZ2h0KTtcblx0XHRcdFx0Y3R4LmZpbGxTdHlsZSA9IFwiIzAwOTVERFwiO1xuXHRcdFx0XHRjdHguZmlsbCgpO1xuXHRcdFx0XHRjdHguY2xvc2VQYXRoKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGRyYXdCYWxsKCkge1xuXHRjdHguYmVnaW5QYXRoKCk7XG5cdGN0eC5hcmMoeCwgeSwgYmFsbFJhZGl1cywgMCwgTWF0aC5QSSAqIDIpO1xuXHRjdHguZmlsbFN0eWxlID0gXCIjMDA5NUREXCI7XG5cdGN0eC5maWxsKCk7XG5cdGN0eC5jbG9zZVBhdGgoKTtcbn1cblxuZnVuY3Rpb24gZHJhd1BhZGRsZSgpIHtcblx0Y3R4LmJlZ2luUGF0aCgpO1xuXHRjdHgucmVjdChwYWRkbGVYLCBjYW52YXMuaGVpZ2h0IC0gcGFkZGxlSGVpZ2h0LCBwYWRkbGVXaWR0aCwgcGFkZGxlSGVpZ2h0KTtcblx0Y3R4LmZpbGxTdHlsZSA9IFwiIzAwOTVERFwiO1xuXHRjdHguZmlsbCgpO1xuXHRjdHguY2xvc2VQYXRoKCk7XG59XG5cbmZ1bmN0aW9uIGRyYXcoKSB7XG5cdC8vIGNsZWFyIHByZXZpb3VzIGJhbGwgYmVmb3JlIGRyYXdpbmcgYSBuZXcgb25lXG5cdGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblx0ZHJhd0JyaWNrcygpO1xuXHRkcmF3QmFsbCgpO1xuXHRkcmF3UGFkZGxlKCk7XG5cdGRyYXdTY29yZSgpO1xuXHRkcmF3TGl2ZXMoKTtcblx0Y29sbGlzaW9uRGV0ZWN0aW9uKCk7XG5cdC8vIGRldGVjdCBjb2xsaXNpb25zIHdpdGggdG9wIGVkZ2Vcblx0aWYgKHkgKyBkeSA8IGJhbGxSYWRpdXMpIHtcblx0XHRkeSA9IC1keTtcblx0fSBlbHNlIGlmICh5ICsgZHkgPiBjYW52YXMuaGVpZ2h0IC0gYmFsbFJhZGl1cykge1xuXHRcdGlmICh4ID4gcGFkZGxlWCAmJiB4IDwgcGFkZGxlWCArIHBhZGRsZVdpZHRoKSB7XG5cdFx0XHQvLyBiYWxsIGNvbGxpZGVzIHdpdGggdGhlIHBhZGRsZVxuXHRcdFx0ZHkgPSAtZHk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxpdmVzLS07XG5cdFx0XHRpZiAobGl2ZXMgPT09IDApIHtcblx0XHRcdFx0YWxlcnQoXCJHYW1lIE92ZXJcIik7XG5cdFx0XHRcdGRvY3VtZW50LmxvY2F0aW9uLnJlbG9hZCgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0eCA9IGNhbnZhcy53aWR0aCAvIDI7XG5cdFx0XHRcdHkgPSBjYW52YXMuaGVpZ2h0IC0gMzA7XG5cdFx0XHRcdGR4ID0gMjtcblx0XHRcdFx0ZHkgPSAtMjtcblx0XHRcdFx0cGFkZGxlWCA9IChjYW52YXMud2lkdGggLSBwYWRkbGVXaWR0aCkgLyAyO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHQvLyBkZXRlY3QgY29sbGlzaW9uIHdpdGggbGVmdCBhbmQgcmlnaHQgZWRnZXNcblx0aWYgKHggKyBkeCA8IGJhbGxSYWRpdXMgfHwgeCArIGR4ID4gY2FudmFzLndpZHRoIC0gYmFsbFJhZGl1cykge1xuXHRcdGR4ID0gLWR4O1xuXHR9XG5cdC8vIG1vdmUgcGFkZGxlIHJpZ2h0IHVudGlsIHRoZSByaWdodCBlZGdlIG9mIHRoZSBjYW52YXNcblx0aWYgKHJpZ2h0UHJlc3NlZCAmJiBwYWRkbGVYIDwgY2FudmFzLndpZHRoIC0gcGFkZGxlV2lkdGgpIHtcblx0XHRwYWRkbGVYICs9IDc7XG5cdH0gZWxzZSBpZiAobGVmdFByZXNzZWQgJiYgcGFkZGxlWCA+IDApIHtcblx0XHQvLyBtb3ZlIHBhZGRsZSBsZWZ0IHVudGlsIHRoZSBsZWZ0IGVkZ2Ugb2YgdGhlIGNhbnZhc1xuXHRcdHBhZGRsZVggLT0gNztcblx0fVxuXHQvLyBpbmNyZW1lbnQgeCBhbmQgeVxuXHR4ICs9IGR4O1xuXHR5ICs9IGR5O1xuXG5cdHJlcXVlc3RBbmltYXRpb25GcmFtZShkcmF3KTsgLy8gYW5pbWF0aW9uIGxvb3BzXG59XG5cbmRyYXcoKTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./public/js/game.js\n");

/***/ })

/******/ });