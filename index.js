let weekDay = {
    "12 AM": "",
    "1 AM": "",
    "2 AM": "",
    "3 AM": "",
    "4 AM": "",
    "5 AM": "",
    "6 AM": "",
    "7 AM": "",
    "8 AM": "",
    "9 AM": "",
    "10 AM": "",
    "11 AM": "",
    "12 PM": "",
    "1 PM": "",
    "2 PM": "",
    "3 PM": "",
    "4 PM": "",
    "5 PM": "",
    "6 PM": "",
    "7 PM": "",
    "8 PM": "",
    "9 PM": "",
    "10 PM": "",
    "11PM": "",
  };
  
  $(document).ready(function(){
    if(!localStorage.getItem('weekDay')) {
      updateCalendarTasks(workDay);
    } else {
      updateCalendarTasks(JSON.parse(localStorage.getItem('weekDay')));
    }
  })
  
  $('#date-today h6').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm:ss a'));
  
  let counter = 1;
  for(const property in workDay) {
    let textEntry = "#text-entry" + counter;
    $(textEntry).text(workDay[property]);
    let timeId = "#time" + counter;
    let presentHour = moment().hour();
    let timeString = $(timeId).text();
    let timeNumber = hourNumberFromHourString(timeString);  
    if(timeNumber < presentHour) {
      $(textEntry).addClass("past-hour");
    } else if (timeNumber > presentHour) {
      $(textEntry).addClass("future-hour");
    } else {
      $(textEntry).addClass("present-hour");
    }
    counter ++;
  }
  
  $("button").click(function() {
    value = $(this).siblings("textarea").val();
    hourString = $(this).siblings("div").text();
    
    saveSchedule(hourString, value);
  });
  
  function hourNumberFromHourString(hourString) {
    switch(hourString) {
      case "12 AM": return 0;
      case "1 AM": return 1;
      case "2 AM": return 2;
      case "3 AM": return 3;
      case "4 AM": return 4;
      case "5 AM": return 5;
      case "6 AM": return 6;
      case "7 AM": return 7;
      case "8 AM": return 8;
      case "9 AM": return 9;
      case "10 AM": return 10;
      case "11 AM": return 11;
      case "12 PM": return 12;
      case "1 PM": return 13;
      case "2 PM": return 14;
      case "3 PM": return 15;
      case "4 PM": return 16;
      case "5 PM": return 17;
      case "6 PM": return 18; 
      case "7 PM": return 19;
      case "8 PM": return 20;
      case "9 PM": return 21;
      case "10 PM": return 22;
      case "11 PM": return 23;
    }
  }
  
  function loadCorrectDataset() {
    result = localStorage.getItem('weekDay')
    return (result ? result : workDay);
  }
  
  function initializeLocalStorage() {
    localStorage.setItem('weekDay', JSON.stringify(workDay));
  };
  
  function saveToLocalStorage(dayObj) {
    localStorage.setItem('weekDay', JSON.stringify(dayObj));
  }
  
  function saveSchedule(hourString, val) {
    if(!localStorage.getItem('weekDay')) {
      initializeLocalStorage();
    }
  
    let workHours = JSON.parse(localStorage.getItem('weekDay'));
    workHours[hourString] = val
  
    saveToLocalStorage(workHours);
  }
  
  function updateCalendarTasks(dayObject) {
    $(".calendar-row").each(function(index) {
      let res = $(this).children("div");
      $(this).children("textarea").text(dayObject[res.text()]);
    })
};