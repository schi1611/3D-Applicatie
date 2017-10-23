class Player {
    constructor(name, snake, controls)
    {
        //let score = 0;
        this.name = name;
        this.snake = snake;
        this.controls = controls;
        this.loser = false;
    }

    update()
    {
        if (this.controls.leftPressed())
            this.snake.left();
        if (this.controls.rightPressed())
            this.snake.right();
        if (this.controls.jumpPressed())
        {
            if(this.snake.isAllowedToJump){
                if(!this.snake.isJumping){
                    this.snake.jump();
                    this.snake.isAllowedToJump = false;
                    let that = this.snake;
                    setTimeout(function(){that.isAllowedToJump = true;}, this.snake.waitToJump);
                }
            }
            this.controls.clearJump();
        }

    }
}
