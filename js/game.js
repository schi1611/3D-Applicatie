class Game {
    constructor(players,turns){
        this.controllers = {};
        this.players = players;
        this.turns = turns;
        this.world = "hello world type here the number of players: <input type=\"text\" id='ptext' >";
        document.getElementById("game").innerHTML = this.world;
        this.ptext = document.getElementById("ptext");
        console.log(this.ptext);
    }
    startgame()
    {
        console.log("lol");
    }
    setcontrols(left, right, jump)
    {

    }
}