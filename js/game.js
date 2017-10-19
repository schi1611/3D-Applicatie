
class Game {
    constructor(players,turns){
        this.controllers = {};
        this.players = players;
        this.turns = turns;
        this.world = "Hello World, type here the number of players: <input required type=\"number\" min=\"2\" max=\"8\" value=\"2\" id=\"ptext\" > " +
            "<input type='button' value='Everdien' onclick='getid()'>";
        document.getElementById("game").innerHTML = this.world;

        console.log(this.ptext);
    }
    startgame()
    {
        console.log("lol");
    }
    setcontrols(left, right, jump)
    {

    }
    gettext()
    {
        var ptext = document.getElementById("ptext").value;
        if (ptext > 8)
            ptext = 8;
        if (ptext < 2)
            ptext = 2;
        console.log(ptext);
    }

}

function getid(){
    game.gettext();
}