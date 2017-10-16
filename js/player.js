class Player {
    constructor(color, snake, controls)
    {
        var score = 0;
        this.color = color;
        this.snake = snake;
        this.controls = controls;
    }

    update()
    {
        if (this.controls.leftPressed())
            this.snake.left()
        if (this.controls.rightPressed())
            this.snake.right()
        if (this.controls.jumpPressed())
        {
            console.log("ik spring");
            this.controls.clearJump();
        }

    }
}
