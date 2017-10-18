class Player {
    constructor(name, snake, controls)
    {
        var score = 0;
        this.color = name;
        this.snake = snake;
        this.controls = controls;
    }

    update()
    {
        if (this.controls.leftPressed())
            this.snake.left();
        if (this.controls.rightPressed())
            this.snake.right();
        if (this.controls.jumpPressed())
        {
            if(!this.snake.jumping){
                this.snake.jump();
            }
            this.controls.clearJump();
        }

    }
}
