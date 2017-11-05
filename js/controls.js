/**
 * Created by Leon on 15-10-2017.
 * Game controls die jezelf kan invoeren.
 */
class Controls
{
    constructor (left,right,jump){
        var defaultList = {'LEFT' : 37, 'RIGHT' : 39, 'JUMP' : 32, 'DOWN' : 40};
        // var leftDefault = defaultList[left.toLowerCase()];
        // var rightDefault = defaultList[right.toLowerCase()];
        // var jumpDefault  = defaultList[jump.toLowerCase()];

        left = left?  left.toUpperCase(): 'LEFT';
        right = right? right.toUpperCase(): 'RIGHT';
        jump = jump? jump.toUpperCase(): 'JUMP';

        this.left = left in defaultList? defaultList[left] : left.charCodeAt(0);
        this.right = right in defaultList? defaultList[right] : right.charCodeAt(0);
        this.jump = jump in defaultList? defaultList[jump] : jump.charCodeAt(0);


        //
        // if(left === "LEFT" || left === "left")
        //     this.left = 37;
        // if (right === "RIGHT" || right === "right")
        //     this.right = 39;
        // if (jump === "JUMP" || jump === "jump")
        //     this.jump = 32;
        // if (jump === "UP" || jump === "up")
        //     this.jump = 38;
        // if (jump === "DOWN" || jump === "down")
        //     this.jump = 40;


        this.keyboard = {};
        this.keyboard[this.left] = false;
        this.keyboard[this.right] = false;
        this.keyboard[this.jump] = false;
        let self = this;
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