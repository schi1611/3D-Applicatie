class Player {
    constructor(color, snake)
    {
        var score = 0;
        this.color = color;
        this.snake = snake;
        this.keyboard = {};
    }

controls(left, right)
    {
        window.addEventListener('keydown', controlfunction);

        function controlfunction(event)
        {
            //this.keyboard[event.keyCode] = true;
            var left = prompt("button Left").charCodeAt(0) ;
            var right = prompt("button right").charCodeAt(0) ;
            console.log(event.keyCode);
        }
    }
}
