var clickedArr = []; //contains html content of clicked cards
var parentsArr = []; //contain clicked cards path
var clearTime; //clear stored data after double click
var rotateTime; //time waited for rotaded cards
var matched;
var sucessCount = 0; //count succes times
var count = 60; //allowed time for a game
var score = 0;  
var interval;
var startBtn = document.getElementById("startBtn");
var againBtn = document.getElementById("againBtn");
var seconds = document.getElementById("seconds");
var overlaySuccess = document.getElementsByClassName("overlay-success");
var flipCardInner =document.getElementsByClassName("flip-card-inner");

//timer
function stopWatch() {
	count--;
	seconds.innerText = count;
	if (count == 0) {
		overlaySuccess[0].style.top = "0";
		document.getElementById("score").style.display="block";
		document.getElementById("score").innerHTML="score: " + score + "/12";
		document.getElementById("message").innerHTML = "Time Out !!"
	}
}
//start screen
startBtn.addEventListener("click", function () {
	this.parentElement.style.display = "none";
	randomCreation();
	clickCard();
	interval = setInterval(stopWatch, 1000);
})
///////////////////////////////
//play again
againBtn.addEventListener("click", function () {
	this.parentElement.parentElement.style.display = "none";
	location.reload();
	clickCard();
	interval = setInterval(stopWatch, 1000);
})

//function click card
function clickCard() {
	for (i = 0; i < document.getElementsByClassName("flip-card-inner").length; i++) {
		(document.getElementsByClassName("flip-card-inner")[i]).addEventListener("click", handleClick);
	}
};


//pushing clicked values and elements in array at max 2 clicks only

function handleClick() {
	this.style.transform = "rotateY(180deg)";
	parentsArr.push(this);
	clickedArr.push(this.lastElementChild.innerHTML);
	console.log(clickedArr);
	if (clickedArr.length == 2) {
		if (clickedArr[0] == clickedArr[1]) {
			removeSimilar();
			clearElementsArr();
		} else {
			rotateDifferant();
			clearElementsArr();
		}
	}
}
//clear invalid data from array
function clearElementsArr() {
	clearTime = setTimeout(function () {
		clickedArr = [];
		parentsArr = []
	}, 500)
}
//rotate differant
function rotateDifferant() {
	rotateTime = setTimeout(function () {
		for (var i = 0; i < parentsArr.length; i++) {
			parentsArr[i].style.transform = "rotateY(360deg)";
		}
	}, 400)
}

//remove matched items
function removeSimilar() {
  matched = setTimeout(function(){
    for (var i = 0; i < parentsArr.length; i++) {
						parentsArr[i].style.opacity = "0";
						score++;
      sucessCount++;
      if (sucessCount == (document.getElementsByClassName("card").length)) {
        overlaySuccess[0].style.top = "0";
      }
    }
  },500)
	
	
}
	//randomly cards

	function randomCreation(){
  for (var i=0 ;i<flipCardInner.length ; i++){
			flipCardInner[i].style.order=Math.floor(Math.random(i)*10)
		}
	}
	