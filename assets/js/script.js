// local variables
var thisDay = moment().format("dddd, MMMM Do YYYY ");
var presentTime = moment().format("H A");

$("#currentDay").text(thisDay);


// Hour entries for each hour of the workday
var daysTimeHour = [
    { time: "9 AM", 
        event: "" },
    { time: "10 AM", 
        event: "" },
    { time: "11 AM", 
        event: "" },
    { time: "12 PM", 
        event: "" },
    { time: "1 PM", 
        event: "" },
    { time: "2 PM", 
        event: "" },
    { time: "3 PM", 
        event: "" },
    { time: "4 PM", 
        event: "" },
    { time: "5 PM", 
        event: "" },
  ];

var todayEvents = JSON.parse(localStorage.getItem("workDay"));
if (todayEvents) {
  daysTimeHour = todayEvents;
}

$("#currentDay").text(thisDay);

// Rows to be created to the container to impliment the html code/css code 
daysTimeHour.forEach(function(timeBlock, index) {
	var timeLabel = timeBlock.time;
	var blockColor = colorRow(timeLabel);
	var row =
		'<div class="time-block" id="' +
		index +
		'"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
		timeLabel +
		'</div><textarea class="form-control ' +
		blockColor +
		'">' +
		timeBlock.event +
		'</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-save"></i></button></div></div></div>';
    $(".container").append(row);
});

// in the rows they will change by color as the hour moves to the next hour for useful future highlights or used for alerts 
function colorRow(time) {
	var present = moment(presentTime, "H A");
	var currentTime = moment(time, "H A");
	if (present.isBefore(currentTime) === true) {
		return "future";
	} else if (present.isAfter(currentTime) === true) {
		return "past";
	} else {
		return "present";
	}
}

// upon click the event will be saved to the local storage where it'll be saved until the event is deleted and saved again 
$(".saveBtn").on("click", function() {
	var blockID = parseInt(
		$(this)
			.closest(".time-block")
			.attr("id")
	);
	var enterText = $.trim(
		$(this)
			.parent()
			.siblings("textarea")
			.val()
	);
	daysTimeHour[blockID].event = enterText;

	localStorage.setItem("workDay", JSON.stringify(daysTimeHour));
});