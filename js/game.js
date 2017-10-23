/**
 * Created by Leon on 17-10-2017.
 */
class Game {
    constructor(){
        this.controllers = {};
        this.playercolors = {};
        this.players = [];
        this.totalplayers;
        this.turns;
        this.colors = ["red", "blue", "yellow", "green", "pink", "black", "white"];
        this.hexcolors = [ 0xf45c42, 0x0033cc, 0xffff00, 0x00ff00, 0xffb3e6, 0x000000, 0xffffff];
        this.world = "Number of players: <input required type=\"number\" min=\"2\" max=\"8\" value=\"2\" id=\"ptext\" > " +
            "<input type='button' value='Okay' id=\"pbutton\" onclick='getText()'>";
        document.getElementById("game").innerHTML = this.world;
    }
    startgame()
    {
        for (var i = 0; i < this.totalplayers; i++)
        {
            this.players.push(new Player(i+1, new Snake(this.playercolors[i]), this.controllers[i]));
            this.players[i].snake.faster();
        }
        players = this.players;
        animate();
        document.getElementById("players").style.display = "none" ;
        document.getElementById("game").style.display = "none";
    }
    setcontrols()
    {
        var playercontrols;
        for (var i = 0; i < this.totalplayers; i++)
        {
            playercontrols = document.getElementsByName("player" + (i+1));
            //var tempcontrols = new Controls(playercontrols[0].value,playercontrols[1].value,playercontrols[2].value );
            this.controllers[i] = new Controls(playercontrols[0].value,playercontrols[1].value,playercontrols[2].value );
        }
    }
    setcolors()
    {
        var scolor = document.getElementById("player1").value;
        for (var i = 0; i < this.totalplayers; i++)
        {
            for (var j = 0; j < this.colors.length; j++)
            {
                if (document.getElementById("player" + (i+1)).value == this.colors[j])
                {
                    this.playercolors[i] = this.hexcolors[j];
                    break;
                }
            }
        }
    }
    gettext()
    {
        var ptext = document.getElementById("ptext").value;
        if (ptext > 8)
            ptext = 8;
        if (ptext < 2)
            ptext = 2;
        this.totalplayers = ptext;
        var playerfield = "";
        for (var i = 0; i < ptext; i++)
        {
            playerfield += "<p>Player " + (i+1)+ " <input type='text' value='left' name= 'player" + (i+1) + "' > " +
                "<input type='text' value='right' name= 'player" + (i + 1) + "' >" +
                "<input type='text' value='jump' name='player" + (i + 1) + "' > <select id='player" + (i + 1) + "'> ";
            for (var j = 0; j < this.colors.length; j++)
                playerfield += "<option value='" + this.colors[j] + "'>" + this.colors[j] + "</option>"
            playerfield += "</select> <br>";
        }
        document.getElementById("players").innerHTML = playerfield + "<input type='button' value='Play' id='startbutton' onclick='setControls()'> <br> ";
    }
    resetGame()
    {

    }

}

function getText(){
    game.gettext();
}

function setControls()
{
    game.setcontrols();
    game.setcolors();
    settingsOff();
    game.startgame();
}