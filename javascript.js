function testConditional() {
	if (document.getElementById("firstname").value == "Claire") {
		alert("Well done, this is the correct name");
		// now call another function from this function
		testFunctionParameters('Ellul');
	}
	else {
		alert("Sorry, try again");
	}
}

function testFunctionParameters(parameter){
	alert("Surname is "+ parameter)
}