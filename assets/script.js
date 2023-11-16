$(document).ready(function () {
  // Display current day at the top of the calendar
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

  // Function to determine the time block class
  function getTimeBlockClass(hour) {
    var currentHour = dayjs().hour();

    if (hour < currentHour) {
      return "past";
    } else if (hour === currentHour) {
      return "present";
    } else {
      return "future";
    }
  }

  // Function to generate time blocks
  function generateTimeBlocks() {
    for (var hour = 9; hour <= 17; hour++) {
      var timeBlock = $("<div>").addClass("row time-block").attr("id", "hour-" + hour);
      var timeLabel = $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(dayjs().hour(hour).format("hA"));
      var eventInput = $("<textarea>").addClass("col-8 col-md-10 description " + getTimeBlockClass(hour)).attr("rows", "3");
      var saveButton = $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save").html("<i class='fas fa-save' aria-hidden='true'></i>");

      timeBlock.append(timeLabel, eventInput, saveButton);
      $(".container-fluid").append(timeBlock);
    }

    // Load saved events from local storage
    for (var i = 9; i <= 17; i++) {
      var savedEvent = localStorage.getItem("event_" + i);
      if (savedEvent) {
        $("textarea." + getTimeBlockClass(i)).eq(0).val(savedEvent);
      }
    }
  }

  // Call the function to generate time blocks
  generateTimeBlocks();

  // Save button click event
  $(".saveBtn").on("click", function () {
    var hour = $(this).parent().attr("id").split("-")[1];
    var eventText = $(this).siblings(".description").val();
    localStorage.setItem("event_" + hour, eventText);
  });
});