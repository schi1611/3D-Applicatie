/**
 * Created by Leon on 17-10-2017.
 */
class Game {
    constructor(){
        this.controllers = {};
        this.playercolors = {};
        this.players = [];
        //Geen idee waarom ze hier zijn.
        //this.totalplayers;
        //this.turns;
        this.colors = ["red", "blue", "yellow", "green", "pink", "black", "white"];
        this.hexcolors = [ 0xf45c42, 0x0033cc, 0xffff00, 0x00ff00, 0xffb3e6, 0x000000, 0xffffff];
        this.world = "Number of players: <input required type=\"number\" min=\"2\" max=\"8\" value=\"2\" class='cinput' id=\"ptext\" > " +
            "<input type='button' value='Okay' id=\"pbutton\" onclick='getText()'>";
        document.getElementById("game").innerHTML = this.world;
    }
    startgame()
    {
        for (let i = 0; i < this.totalplayers; i++)
        {
            this.players.push(new Player(i+1, new Snake(this.playercolors[i]), this.controllers[i]));
            //this.players[i].snake.faster();
        }
        players = this.players;
        animate();
        addPowerUps();
        document.getElementById("players").style.display = "none" ;
        document.getElementById("game").style.display = "none";
		document.getElementById("image").style.display = "none";
    }
    setcontrols()
    {
        let playercontrols;
        for (let i = 0; i < this.totalplayers; i++)
        {
            playercontrols = document.getElementsByName("player" + (i+1));
            //var tempcontrols = new Controls(playercontrols[0].value,playercontrols[1].value,playercontrols[2].value );
            this.controllers[i] = new Controls(playercontrols[0].value,playercontrols[1].value,playercontrols[2].value );
        }
    }
    setcolors()
    {
        for (let i = 0; i < this.totalplayers; i++)
        {
            for (let j = 0; j < this.colors.length; j++)
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

        let text = "";
        let playerfield = "";
        for (let i = 0; i < this.totalplayers; i++)
        {
            text = "<p>Give in your preferred controls and color down below</p>";
            playerfield += "<p>Player " + (i+1)+ " <input type='text' placeholder='left' class='cinput' name= 'player" + (i+1) + "' > " +
                "<input type='text' placeholder='right' class='cinput' name= 'player" + (i + 1) + "' >" + " " +
                "<input type='text' placeholder='jump' class='cinput' name='player" + (i + 1) + "' > <select id='player" + (i + 1) + "'> ";
            for (let j = 0; j < this.colors.length; j++)
                playerfield += "<option value='" + this.colors[j] + "'>" + this.colors[j] + "</option>"
            playerfield += "</select> <br>";
        }
        document.getElementById("players").innerHTML = text + playerfield + "<input type='button' value='Play' id='startbutton' onclick='setControls()'> <br> ";
    }
    static resetGame()
    {
        for (let i = 0;i < players.length; i++) {
            //reset speler positie
            players[i].snake.resetSnake();
            //alle trails en objecten moeten verwijderd zijn.
            players[i].snake.eraser();
            //reset de winnaar
            players[i].loser = false;
        }
        //reset powerups
        for (let i = 0; i < powerUpArr.length; i++)
            powerUpArr[i].removeMesh();
        powerUpArr = [];
        //reset paused variable (for powerups)
        paused = false;
        addPowerUps();
        //clear de duration of the powerup on the snake
        clearTimeout(timeoutfunction);
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
    document.getElementById("win").style.display = "none";
    Game.resetGame();
}