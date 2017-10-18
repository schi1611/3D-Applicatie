class Game {
    constructor(players,turns){
        this.players = players;
        this.turns = turns;
        var world = "hello world with the number of players : " + this.players + " and lasting: " + this.turns + " turns";
        document.getElementById("game").innerHTML = world;
    }
    // startgame()
    // {
    //     console.log("lol");
    // }
    // setcontrols(left, right, jump)
    // {
    //     return new Controls(left,right,jump);
    // }
}