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
        this.world = "Number of players: <input required type=\"number\" min=\"2\" max=\"8\" value=\"2\" class='cinput' id=\"ptext\" > " +
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
        for (var i = 0; i < this.totalplayers; i++)
        {
            for (var j = 0; j < this.colors.length; j++)
            {
                if (document.getElementById("player" + (i+1)).value === this.colors[j])
                {
                    this.playercolors[i] = this.hexcolors[j];
                    break;
                }
            }
        }
    }
    gettext()
    {
        this.totalplayers = document.getElementById("ptext").value;
        if (this.totalplayers > 8)
            this.totalplayers = 8;
        if (this.totalplayers < 2)
            this.totalplayers = 2;

        var text = "";
        var playerfield = "";
        for (var i = 0; i < this.totalplayers; i++)
        {
            text = "<p>Give in your preferred controls and color down below</p>";
            playerfield += "<p>Player " + (i+1)+ " <input type='text' placeholder='left' class='cinput' name= 'player" + (i+1) + "' > " +
                "<input type='text' placeholder='right' class='cinput' name= 'player" + (i + 1) + "' >" + " " +
                "<input type='text' placeholder='jump' class='cinput' name='player" + (i + 1) + "' > <select id='player" + (i + 1) + "'> ";
            for (var j = 0; j < this.colors.length; j++)
                playerfield += "<option value='" + this.colors[j] + "'>" + this.colors[j] + "</option>"
            playerfield += "</select> <br>";
        }
        document.getElementById("players").innerHTML = text + playerfield + "<input type='button' value='Play' id='startbutton' onclick='setControls()'> <br> ";
    }
    resetGame()
    {
        for (var i = 0;i < players.length; i++) {
            //reset speler positie
            players[i].snake.resetSnake();
            //alle trails en objecten moeten verwijderd zijn.
            players[i].snake.eraser();
            //reset de winnaar
            players[i].loser = false;
        }
        //reset powerups
        for (var i = 0; i < powerUpArr.length; i++)
            powerUpArr[i].removeMesh();
        powerUpArr = [];
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
function gamereset() {
    document.getElementById("overlay2").style.display = "none";
    game.resetGame();
}