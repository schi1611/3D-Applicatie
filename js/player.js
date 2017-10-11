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
        var left = "";
        var right = "";
        window.addEventListener('keydown', controlfunction);

        function controlfunction(event)
        {

            //this.keyboard[event.keyCode] = true;
            if (left == "" && right == "") {
                left = prompt("button Left").charCodeAt(0);
                right = prompt("button right").charCodeAt(0);
            }
            console.log(event.keyCode);
            if (event.keyCode == left)
                alert("je gaat links");
            if (event.keyCode == right)
                alert("je gaat rechts");
        }
    }
}
