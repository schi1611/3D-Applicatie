class Player {
    constructor(color, _snake)
    {
        var score = 0;
        this.color = color;
        this.snake = _snake;
        this.keyboard = {};
    }

controls(left,right)
    {
        var left = left.charCodeAt(0);
        var right = right.charCodeAt(0);
        window.addEventListener('keydown', controlfunction);

        var sn = this.snake;
        function controlfunction(event)
        {

            //this.keyboard[event.keyCode] = true;
            // if (left == "" && right == "") {
            //     left = prompt("button Left").charCodeAt(0);
            //     right = prompt("button right").charCodeAt(0);
            // }
            console.log(event.keyCode);
            if (event.keyCode == left)
            {
                sn.direction.z -=  Math.PI * 0.01;
            }

            if (event.keyCode == right) {
                sn.direction.z +=  Math.PI * 0.01;
            }
        }
    }
}
