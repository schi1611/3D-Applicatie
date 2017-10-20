/**
 * Created by Leon on 17-10-2017.
 */
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

    }
    setcontrols()
    {
        var playercontrols;
        for (var i = 0; i < this.players; i++)
        {
            playercontrols = document.getElementsByName("player" + (i+1));
            var tempcontrols = new Controls(playercontrols[0].value,playercontrols[1].value,playercontrols[2].value );
            this.controllers[i] = tempcontrols;
        }
    }
    gettext()
    {
        var ptext = document.getElementById("ptext").value;
        if (ptext > 8)
            ptext = 8;
        if (ptext < 2)
            ptext = 2;
        this.players = ptext;
        var playerfield = "";
        for (var i = 0; i < ptext; i++)
        {
            playerfield += "<p>Player " + (i+1)+ " <input type='text' value='left' name= 'player" + (i+1) + "' > " +
                "<input type='text' value='right' name= 'player" + (i + 1) + "' >" +
                "<input type='text' value='jump' name='player" + (i + 1) + "' > <br>"
        }
        document.getElementById("players").innerHTML = playerfield + "<input type='button' value='okay' onclick='setControls()'> <br> ";
    }

}

function getText(){
    game.gettext();
}

function setControls()
{
    game.setcontrols();
}