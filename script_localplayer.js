/*jslint browser:true, plusplus:true, vars: true */
"use strict";
function TwoPlayerGame() {
    Game.call(this);

    this.ai = function (aiMoveValue) {
            this.paused = false;
            this.rejectClick = false;
    }

}
document.addEventListener('DOMContentLoaded', function () {
    this.game = new TwoPlayerGame();
});