/*jslint browser:true, plusplus:true, vars: true */
"use strict";
function TwoPlayerGame() {
    Game.call(this);
    var that = this;

    this.ai = function (aiMoveValue) {
		this.requestMove();
    };

	this.requestMove = function(){
	  var xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	    	console.info(this.responseText);

	    	that.action(1, function () {
				that.rejectClick = false;
            });
	    }
	  };
	  xhttp.open("GET", "https://lariphantevade.appspot.com/c4/row", true);
	  xhttp.send();

	  that.paused = false;
	};


}
document.addEventListener('DOMContentLoaded', function () {
    this.game = new TwoPlayerGame();
});