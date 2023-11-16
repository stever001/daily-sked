// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
//==========================================

$(function () {
  // Add a listener for click events on the save button.
  $(".saveBtn").on("click", function () {
    // Use the id in the containing time-block as a key to save the user input in local storage.
    var userEvent = $(this).siblings(".description").val();
    var hourId = $(this).siblings(".hour").attr("id");
    localStorage.setItem(hourId, userEvent);
  });

  // Add code to apply the past, present, or future class to each time block.
  function updateHourBlocks() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var hourId = parseInt($(this).attr("id").split("-")[1]);

      if (hourId < currentHour) {
        $(this).addClass("past").removeClass("present future");
      } else if (hourId === currentHour) {
        $(this).addClass("present").removeClass("past future");
      } else {
        $(this).addClass("future").removeClass("past present");
      }
    });
  }

  // Call the function to update hour blocks on page load
  updateHourBlocks();

  // Add code to get user input saved in localStorage and set the values of the corresponding textarea elements.
  function loadSavedEvents() {
    $(".time-block").each(function () {
      var hourId = $(this).attr("id");
      var savedEvent = localStorage.getItem(hourId);
      $(this).find(".description").val(savedEvent);
    });
  }

  // Call the function to load saved events on page load
  loadSavedEvents();

  // Add code to display the current date in the header of the page.
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
});
