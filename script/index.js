
document.addEventListener('DOMContentLoaded', init, false);

function init(){
	var button = document.getElementById('btn');
	button.addEventListener('click', message, true); 
	addCalenderToDateField();
	setStartDate();	
	setSizes();
}
function setSizes () {
	// get screen witdth
	var screenWidth = $( window ).width();	// Returns width of browser viewport
	if ( screenWidth > 1000 ) {
		$("#box").width(screenWidth/2);	// set box width
	}		
}
function setStartDate (){
	$(document).ready(function(){
		//$('#datepicker').datepicker({ });
		$('#datepicker').datepicker({ }).attr('readonly','readonly');
		var myDate = new Date();
		var month = myDate.getMonth() + 1;
		var prettyDate = month + '/' + myDate.getDate() + '/' + myDate.getFullYear();
		$('#datepicker').val(prettyDate);
	});
}

function addCalenderToDateField(){
	$( function() {
		$( "#datepicker" ).datepicker(	
		);
	} );
}

function message () {
	$("#textArea").text("clicked");
	$("#textArea").css("background", "yellow");
	$("#textArea").css("padding", "15px", "32px");
	$("#textArea").css("border-radius", "8px");
	setSizes();
	var dayNumber = diffDays($('#datepicker').val());
	var fileURL = "";
	var fileNumber = parseInt(dayNumber/10, 10);
	var entryInFileNumber = dayNumber % 10;
	fileURL = "files/" + parseInt(dayNumber/10, 10) + ".xml";
	
	try{	
		$(document).ready(function () {
			$("#textArea").text("Reading xml file");
			$.ajax({
				type: "GET",
				url: fileURL,
				cache: false,
				dataType: "xml",
				success: function(xml) {
					$(xml).find('Vits').each(function(){
						var tempVits = $(this);
						$(this).find("Title").each(function(){
							if(parseInt($(this).text(), 10)  == entryInFileNumber){ // if Title = last digit(s) of daynumber, add text to html
								var sText = tempVits.find("Text").text();
								$("#textArea").text(sText);
								return;
							};
							if(dayNumber == (-1)){
								$("#textArea").text("Sjerpings! Det blir juks å velge dato fram i tid / Invalid date selected.");
								return;
							};
						});
					});
				}
			});
		});
	}
	catch (err){
		$("#textArea").text("Error reading xml file");
	}
}

function diffDays(date){
	var StartDate = new Date(2017, 10-1, 25);  // 2000-01-01
	var EndDate = new Date(date);					// Today
	var today = new Date();
	var nDays = (Date.UTC(EndDate.getFullYear(), EndDate.getMonth(), EndDate.getDate()) -
					Date.UTC(StartDate.getFullYear(), StartDate.getMonth(), StartDate.getDate())) / 86400000;
	var daysSinceStartDate = (Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) -
					Date.UTC(StartDate.getFullYear(), StartDate.getMonth(), StartDate.getDate())) / 86400000;
	//alert("SelectedDate = " + EndDate + ". \nToday = " + today + "\ndeltaDays = " + nDays + "\nDays between today and startDate= " + daysSinceStartDate);
	if(nDays < 0 || nDays > daysSinceStartDate){
		return -1;
	};
	return nDays;
}
