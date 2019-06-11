//gloabal elements
var container = $("#container");
var timer = $("#timer");
var question = $("#question");
var answer = $("#answer");
var buttonBox = $("#button-box");
var submitButton = $("#submit");

var answers = [];
var score = 0;

//timer functionality
var timerInterval;
var isRunning = false;

//question array
var questions = [
  {
    q: "Before being cast as 'Six', Tricia Helfer had a successful career as",
    qImg: "assets/images/cylons/six.jpg",
    a: ["a braodway actor", "an insurance agent with State Farm", "a model", "the CFO of the PINK fasion line", "a teacher"],
    load: function() {
      loadText(this);
    }
  },
  {
    q: "Which of the following characters is not a cylon?",
    a: [
      "assets/images/cylons/ellen.jpg",
      "assets/images/cylons/eight.jpg",
      "assets/images/cylons/tory.jpg",
      "assets/images/cylons/leoben.jpg",
      "assets/images/cylons/simon.jpg",
      "assets/images/cylons/aaron.jpg",
      "assets/images/cylons/one.jpg",
      "assets/images/people/gaius-baltar.jpg"
    ],
    load: function() {
      loadImg(this);
    }
  },
  {
    q: "What position did Laura Roslin hold before she became president of the colonies?",
    qImg: "assets/images/people/laura-roslin.jpg",
    a: ["teacher", "cabinet secretary", "lunch lady", "personal assistant to William Adama", "staff seargent", "she was unemployed"],
    load: function() {
      loadText(this);
    }
  },
  {
    q: "which of the following charachters appeard in the original 1978 Battlestar Galactica?",
    a: [
      "assets/images/cylons/saul.jpg",
      "assets/images/cylons/ellen.jpg",
      "assets/images/cylons/one.jpg",
      "assets/images/cylons/leoben.jpg",
      "assets/images/people/tom.jpg",
      "assets/images/people/william-adama.jpg",
      "assets/images/people/laura-roslin.jpg"
    ],
    load: function() {
      loadImg(this);
    }
  },
  {
    q: "Who is shown in the picture to the left?",
    qImg: "assets/images/people/hot-dog.jpg",
    a: ["Hot Dog", "Apollo", "Boomer", "Crashdown", "Helo", "Tyrol", "Starbuck", "Kat"],
    load: function() {
      loadText(this);
    }
  }
];

function startTimer() {
  if (isRunning) {
    return;
  }
  var timeInSeconds = parseInt(timer.text());
  timer.text(timeInSeconds);

  var timerInterval = setInterval(function() {
    if (timeInSeconds === 0) {
      clearInterval(timerInterval);
      return;
    } else if (!isRunning) {
      clearInterval(timerInterval);
    }
    timeInSeconds--;

    timer.text(formatTime(timeInSeconds));
  }, 1000);
  isRunning = true;
}

function stopTimer() {
  isRunning = false;
}

function formatTime(time) {
  if (time == 10) {
    timer.toggleClass("light-blue");
    timer.toggleClass("dark-red");
  }
  if (time < 10) {
    time = "0" + time;
  }
  return time;
}

function markAnswer() {
  score += parseInt($(this).attr("value"));
  console.log(score);
  //load next question....
}

function loadText(obj) {
  var img = $("<img>");
  img.attr("src", obj.qImg);
  img.addClass("image");
  question.append(img).append(obj.q);
  var ans = obj.a.sort(function(a, b) {
    return 0.5 - Math.random();
  });
  $.each(ans, function(index, value) {
    var val = 0;
    if (value.includes("model")) val = 1;
    var ans = $("<div>");
    ans
      .addClass("text answer")
      .attr("value", val.toString())
      .text(value)
      .on("click", markAnswer);
    answer.append(ans);
  });
}

function loadImg(obj) {
  console.log(obj);
  question.text(obj.q);
  var answers = obj.a.sort(function(a, b) {
    return 0.5 - Math.random();
  });
  $.each(answers, function(index, value) {
    var val = 0;
    if (value.includes("gaius")) val = 1;
    var img = $("<img>");
    img
      .attr("src", value)
      .attr("value", val.toString())
      .addClass("image answer")
      .on("click", markAnswer);
    answer.append(img);
  });
}

$(document).ready(function() {});
