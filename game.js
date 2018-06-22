var miseravi = 0;
var perdeu = 0;

var soate = 7;

var wordDisplayLettersElement = document.getElementById("palavr");
var PalpElement = document.getElementById("tent");
var eroucount = document.getElementById("erou");
var miseravicount = document.getElementById("miseravi");
var perdeucount = document.getElementById("perdeu");

var termos = document.getElementsByClassName("show");
var alertLineElements = document.getElementsByClassName("alertas");

var validGuesses = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];



var youWin = ["GANHOU !!!!!!!!!!!!!!!!!!!"
	
];
var youLose = [ "PERDEU !!!!!!!!!!!!!!!"
	
];
var emptyAlert = [
	"                                           ",
	"                                           ",
	"                                           ",
	"                                           ",
	"                                           "
];

var forca = new Hangman();

document.onkeyup = function(event) {
	var userGuess = event.key;

	if (!forca.end) {
		if (validGuesses.includes(userGuess) && !forca.Palp.includes(userGuess)) {
			forca.checkGuess(userGuess);
		}
	} else {
		forca = new Hangman();
		forca.updatePageData();
	}
}

window.setInterval(function() {
	if (termos.length > 0) {
		if (forca.Palp.length === 0 || forca.end) {
			if (termos[0].style.opacity === "1") {
				for (var i = 0; i < termos.length; i++) {
					termos[i].style.opacity = "0";
				}
			} else {
				for (var i = 0; i < termos.length; i++) {
					termos[i].style.opacity = "1";
				}
			}
		} else {
			for (var i = 0; i < termos.length; i++) {
				termos[i].style.opacity = "0";
			}
		}
	}
}, 750);

function Hangman() {
	this.wordList = [
		"ricardo",
		"alessandro",
		"denis",
		"celso",
		"susileia",
		"vinicius",
		"uvv",
		"campus",
		"victor",
		"lima",
		"oscar",
		"delta",
		"bravo",
		"baskhara",
		"pi",
		"logaritmo",
		"gene",
		
		
	]

	this.word = this.wordList[Math.floor(Math.random() * this.wordList.length)];
	this.Palp = [];
	this.errors = 0;
	this.visivel = [];
	this.end = false;
	this.alertLines = emptyAlert;
	for (var i = 0; i < this.word.length; i++) {
		this.visivel[i] = (false);
	}
}

Hangman.prototype.checkGuess = function(char) {
	this.Palp.push(char);

	var isInWord = false;
	for (var i = 0; i < this.word.length; i++) {
		if (this.word.charAt(i) === char) {
			isInWord = true;
			this.visivel[i] = true;
		}
	}
	if (!isInWord) {
		this.errors++;
	}

	if (this.errors >= soate) {
		perdeu++;
		this.alertLines = youLose;
		this.end = true;
	}

	if (!this.visivel.includes(false)) {
		miseravi++;
		this.alertLines = youWin;
		this.end = true;
	}

	forca.updatePageData();
};

Hangman.prototype.updatePageData = function() {
	var tempString = "";
	for (var i = 0; i < this.visivel.length; i++) {
		tempString += ((this.visivel[i] || this.end) ? this.word.charAt(i).toUpperCase() : "_");
		if (i < (this.visivel.length - 1)) tempString += " ";
	}
	wordDisplayLettersElement.textContent = tempString;

	tempString = "";
	for (var i = 0; i < this.Palp.length; i++) {
		tempString += (this.Palp[i].toUpperCase());
		if (i < (this.Palp.length - 1)) tempString += " ";
	}
	for (var i = tempString.length; i < 51; i++) {
		tempString += " ";
	}
	PalpElement.textContent = tempString;

	tempString = this.errors + " / " + soate;
	for (var i = tempString.length; i < 32; i++) {
		tempString += " ";
	}
	eroucount.textContent = tempString;

	tempString = miseravi + "";
	for (var i = tempString.length; i < 45; i++) {
		tempString += " ";
	}
	miseravicount.textContent = tempString;

	tempString = perdeu + "";
	for (var i = tempString.length; i < 43; i++) {
		tempString += " ";
	}
	perdeucount.textContent = tempString;

	for (var i = 0; i < termos.length; i++) {
		termos[i].textContent = (this.end ? pressAnyKeyToReset[i] : pressAnyKeyToStart[i]);
	}

	for (var i = 0; i < alertLineElements.length; i++) {
		alertLineElements[i].textContent = (this.alertLines[i]);
	}
}

forca.updatePageData();
