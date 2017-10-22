/**
 * Created by Leon on 15-10-2017.
 */
class Controls
{
    constructor (left,right,jump){
        this.left = left.toUpperCase().charCodeAt(0);
        this.right = right.toUpperCase().charCodeAt(0);
        this.jump = jump.toUpperCase().charCodeAt(0);
        if(left === "LEFT")
            this.left = 37;
        if (right === "RIGHT")
            this.right = 39;
        this.keyboard = {};
        this.keyboard[this.left] = false;
        this.keyboard[this.right] = false;
        this.keyboard[this.jump] = false;
        var self = this;
        function keydownScoped(e) {
            self.keydown(e);
        }
        function keyupScoped(e) {
            self.keyup(e);
        }
        window.addEventListener("keydown", keydownScoped);
        window.addEventListener("keyup", keyupScoped);
    }
    keydown(event) {
        this.keyboard[event.keyCode] = true;
    }
    keyup(event) {
        this.keyboard[event.keyCode] = false;
    }
    leftPressed()
    {
        return this.keyboard[this.left];
    }
    rightPressed(){
        return this.keyboard[this.right];
    }
    jumpPressed() {
        return this.keyboard[this.jump];
    }
    clearJump() {
        this.keyboard[this.jump] = false;
    }
}