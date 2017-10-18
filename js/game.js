class Game {
    constructor(players,turns){
        this.controllers = {};
        this.players = players;
        this.turns = turns;
        this.world = "hello world type here the number of players: <input required type=\"number\" min=\"2\" max=\"8\" value=\"2\" id=\"ptext\" > <input type='submit' value='Everdien'>";
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