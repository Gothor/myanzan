var hiding_time;
var digits;
var time;
var quantity;
var sum;
var serieInProgress = false;

function launchNewSerie() {
    if (!serieInProgress)
        return;
    
    serieInProgress = false;
    
    document.body.removeEventListener("click", launchNewSerie);
    processForm();
}

function showAnswer() {
    if (!serieInProgress)
        return;
    
	var result = document.getElementById("result");
    result.style.color = "white";
    
    document.getElementById("seeAnswerText").style.display = "none";
    document.getElementById("nextSerieText").style.display = "block";
    document.body.removeEventListener("click", showAnswer);
    document.body.addEventListener("click", launchNewSerie);
}

function showAnswerBlock() {
    if (!serieInProgress)
        return;
    
	var numbers = document.getElementById("numbers");
	var answer = document.getElementById("answer");
	var result = document.getElementById("result");
    
    numbers.style.display = "none";
    answer.style.display = "block";
    
    result.innerHTML = sum;
    result.style.color = window.getComputedStyle(document.body).getPropertyValue("background-color");
    
    document.getElementById("seeAnswerText").style.display = "block";
    document.getElementById("nextSerieText").style.display = "none";
    document.body.addEventListener("click", showAnswer);
}

function hideShortly() {
    if (!serieInProgress)
        return;
    
	var numbers = document.getElementById("numbers");
	
	console.debug("hide");
	numbers.innerHTML = "";
	
	setTimeout(newNumber, hiding_time);
}

function newNumber() {
    if (!serieInProgress)
        return;
    
	if (quantity-- > 0) {
		var numbers = document.getElementById("numbers");
		
		var val = Math.floor(Math.random() * (Math.pow(10, digits) - 1)) + 1;
		sum += val;
		
		console.debug("Add " + val);
		numbers.innerHTML = val;
		
		setTimeout(hideShortly, time);
		return;
	}
	console.debug("Result : " + sum);
    showAnswerBlock();
}

function processForm() {
	event.preventDefault();
	
	if (serieInProgress) {
		console.debug("Serie en cours...");
		return false;
	}
	
	var main = document.getElementById("main");
	var numbers = document.getElementById("numbers");
	var answer = document.getElementById("answer");
	serieInProgress = true;
	
	// On récupère les valeurs du formulaire
	digits = document.getElementById("digits").value;
	time = document.getElementById("time").value * 1000;
    hiding_time = document.getElementById("hiding").value * 1000;
	quantity = document.getElementById("quantity").value;
	
	main.style.display = "none";
	numbers.style.display = "block";
    answer.style.display = "none";
	
	sum = 0;
	newNumber();
	
	return false;
}

function backToMenu() {
    serieInProgress = false;
    
    document.body.removeEventListener("click", showAnswer);
    document.body.removeEventListener("click", launchNewSerie);
    
	var main = document.getElementById("main");
	var numbers = document.getElementById("numbers");
	var answer = document.getElementById("answer");
    
    main.style.display = "block";
	numbers.style.display = "none";
	answer.style.display = "none";
}

(function() {
	// On cache les divs inutilisés au départ
	var numbers = document.getElementById("numbers");
	var answer = document.getElementById("answer");
	
    //main.style.display = "none";
	numbers.style.display = "none";
	answer.style.display = "none";
	
	// Envoi du formulaire
    var form = document.getElementById("form");
	if(form.attachEvent) {
		form.attachEvent("submit", processForm);
	}
	else {
		form.addEventListener("submit", processForm);
	}
    
    // Retour au menu
    var back = document.getElementById("back");
	if(back.attachEvent) {
		back.attachEvent("click", backToMenu);
	}
	else {
		back.addEventListener("click", backToMenu);
	}
})();