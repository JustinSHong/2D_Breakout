class Paddle {
    constructor(canvas) {
        // paddle properties
        this.paddleColor = "#0095DD";
        this.paddleHeight = 10;
        this.paddleWidth = 75;
        // starting position
        this.paddleX = (canvas.width - this.paddleWidth) / 2;
    }

    // draw paddle to the canvas
    drawPaddle(canvas) {
        canvas.ctx.beginPath();
        canvas.ctx.rect(
            this.paddleX,
            canvas.height - this.paddleHeight,
            this.paddleWidth,
            this.paddleHeight
        );
        canvas.ctx.fillStyle = this.paddleColor;
        canvas.ctx.fill();
        canvas.ctx.closePath();
    }

    // update paddle position
    update(x) {
        this.paddleX += x;
    }
}

export default Paddle;
