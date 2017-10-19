
class Game {
    constructor(){
        this.controllers = {};
        this.players;
        this.turns;
        this.world = "Hello World, type here the number of players: <input required type=\"number\" min=\"2\" max=\"8\" value=\"2\" id=\"ptext\" > " +
            "<input type='button' value='Everdien' onclick='getText()'>";
        document.getElementById("game").innerHTML = this.world;
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
        this.players = ptext;
        console.log(this.players);
        var playerfield = "";
        for (var i = 0; i < ptext; i++)
        {
            playerfield += "<p>Player" + (i+1)+ " <input type='text' value='left' id = 'player" + (i+1) + "' > " +
                "<input type='text' value='right' id = 'player\" + (i + 1) + \"' >" +
                "<input type='text' value='jump' id = 'player\" + (i + 1) + \"' > <br>"
        }
        document.getElementById("players").innerHTML = playerfield + "<input type='button' value='okay' onclick='alert(\"Tom is dik\")'> <br> ";
    }

}

function getText(){
    game.gettext();
}

function setControls()
{
    game.setcontrols(left,right,jump);
}