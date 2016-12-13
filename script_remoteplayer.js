/*jslint bcolumnser:true, plusplus:true, vars: true */
"use strict";
function TwoPlayerGame() {
    Game.call(this);
    var that = this;
    this.playerNr = -1; // Player1 and Player2

    this.initBoard = function () {

		that.rejectClick = true;

		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", "https://lariphantevade.appspot.com/c4/column/"+that.playerNr, true);
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				console.info(this.responseText);
				if(this.responseText){
					that.playerNr = 2;

					var column = JSON.parse(this.responseText);
					that.action(column.columnNumber, function () {
						that.rejectClick = false;
					});

				} else {
					that.playerNr = 1;
					that.rejectClick = false;
				}

				console.info("you are player nr." + that.playerNr);
			}
		};
		xhttp.send();

    };

    this.onPlayerMove = function(column){
        var valid = this.action(column, function () {
            that.requestMove();
        });
        
        if(valid){
	        var xhttp = new XMLHttpRequest();
			xhttp.open("GET", "https://lariphantevade.appspot.com/c4/move/"+that.playerNr+ "/" +column, true);
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					console.info(this.responseText);
				}
			};
			xhttp.send();
        }

        return valid;
    };



	this.requestMove = function(){
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", "https://lariphantevade.appspot.com/c4/column/"+that.playerNr, true);
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				console.info(this.responseText);
				if(this.responseText){
					var column = JSON.parse(this.responseText);

					that.action(column.columnNumber, function () {
						that.rejectClick = false;
					});
				} else {
					setTimeout(that.requestMove, 1000);
				}
			}
		};
		xhttp.send();

		that.paused = false;
	};

    this.ai = function (aiMoveValue) {
		throw "ai not supported";
    };

	this.initBoard();
}
document.addEventListener('DOMContentLoaded', function () {
    this.game = new TwoPlayerGame();
});