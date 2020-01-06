function startDataUpload() {
	alert ("start data upload");

	var name = document.getElementById("name").value;
	var surname = document.getElementById("surname").value;
	var module = document.getElementById("module").value;

	alert(name + " "+ surname + " "+module);
	
	var postString = "name="+name +"&surname="+surname+"&module="+module;
	
		// now get the checkbox values - separate them with a | so that they can be // split later on if necessary
	var checkString = "";
	for (var i = 1;i< 5;i++){
		if (document.getElementById("check"+i).checked === true) {
			checkString = checkString + document.getElementById("check"+i).value + "||"
		}

	}
		// now get the select box values
	var language = document.getElementById("languageselectbox").value;
	postString = postString + "&language="+language;

	// now get the geometry values
	var latitude = document.getElementById("latitude").value;
	var longitude = document.getElementById("longitude").value;
	postString = postString + "&latitude=" + latitude + "&longitude=" + longitude;

	postString = postString + "&modulelist="+checkString;


// now get the radio button values
	if (document.getElementById("morning").checked) {
 		 postString=postString+"&lecturetime=morning";
	}
	if (document.getElementById("afternoon").checked) {
 		 postString=postString+"&lecturetime=afternoon";
	}

	// finally add the port id
	postString = postString +"&port_id"+httpsPortNumberAPI;
	
	processData(postString);

}

function processData(postString) {
	var serviceUrl= "https://developer.cege.ucl.ac.uk:"+ httpsPortNumberAPI+"/insertFormData"
   $.ajax({
    url: serviceUrl,
    crossDomain: true,
    type: "POST",
    success: function(data){console.log(data); dataUploaded(data);},
    data: postString
}); 
}
// create the code to process the response from the data server
function dataUploaded(data) {
    // change the DIV to show the response
    document.getElementById("dataUploadResult").innerHTML = JSON.stringify(data);
}
