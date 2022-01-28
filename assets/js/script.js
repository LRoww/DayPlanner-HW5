let dayDisplayEl = $('#currentDay');
let saveBtnEl = $('.saveBtn');
let textareaEl = $('textarea');

let khour;
let eventsSaved = ["","","","","","","","",""];

function displayDay() {
  var rightNow = moment().format('dddd, MMMM Do');
  dayDisplayEl.text(rightNow);
}
  
function displayEvents() {
  textareaEl.each(function(index) {
    $( this ).text(eventsSaved[index]);
  })
}

function displayTime(){
  //loop hours and test is Before / is Same / is After to color
  let i = 9;
  let boxh = moment().hour(i);
  let test = moment().hour(12);
  // console.log(test);
  // console.log(moment(test).isAfter(boxh));
 
  $( "textarea" ).each(function() {
    boxh = moment().hour(i);
    test = moment().hour(15);
    // console.log(boxh);
    if ( moment().isAfter(boxh) ) {
      $( this ).addClass('past'); 
    } else if (moment().isSame(boxh)) {
      $( this ).addClass('present'); 
    } else {
      $( this ).addClass('future');
    }
    i++;
  });
}

function init(){
  displayDay();
  displayTime();
  console.log(localStorage.getItem('events'));
  if (localStorage.getItem('events') === null){
    localStorage.setItem('events', JSON.stringify(eventsSaved));
  } else {
    eventsSaved = JSON.parse(localStorage.getItem("events"));
    displayEvents();
  }
}


saveBtnEl.on('click', function(event){
  let newEvent = $(this).prev().val();  // selects prev text content to button clicked
  console.log(newEvent);
  // console.log(event.target); //target
  // console.log(saveBtnEl.index(event.target));
  let i = saveBtnEl.index(event.target);
  eventsSaved[i] = newEvent;
  console.log(eventsSaved);
  console.log(JSON.stringify(eventsSaved));
  localStorage.setItem('events', JSON.stringify(eventsSaved));
})

// localStorage.clear();
init();