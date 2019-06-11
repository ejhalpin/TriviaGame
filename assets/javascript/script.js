//gloabal elements
var container = $("#container");
var timerBar = $("<div id='timer-bar'></div>");
var timer = $("<div id='timer'></div>");
var question = $("<div id='question'></div>");
var answer = $("<div id='answer'></div>");
var number = $("<div id='number'></div>");
var logo = $("#logo");
var header = $("#header");
var titleDiv = $("#title");
var paperOut = $("<div>");
var paperIn = $("<div>");

var score = 0;
var questionIndex = 0;

//timer functionality
var timerInterval;
var isRunning = false;
function startTimer() {
  if (isRunning) return;
  timer.css("width", "100%");
  var percent = 100;
  timerInterval = setInterval(function() {
    percent -= 0.1;
    timer.css("width", percent + "%");
    if (percent === 0) {
      stopTimer();
      return;
    }
  }, 15);
  isRunning = true;
}
function stopTimer() {
  if (!isRunning) return;
  clearInterval(timerInterval);
  isRunning = false;
}
//question array
var questions = [
  {
    q: "Before being cast as 'Six', Tricia Helfer had a successful career as",
    qImg: "assets/images/cylons/six.jpg",
    a: ["a producer", "a braodway actor", "an insurance agent with State Farm", "a model", "the CFO of the PINK fasion line", "a teacher"],
    key: "model",
    load: function() {
      loadText(this);
    }
  },
  {
    q: "Which of the following characters is not a cylon?",
    a: [
      "assets/images/cylons/one.jpg",
      "assets/images/cylons/leoben.jpg",
      "assets/images/cylons/simon.jpg",
      "assets/images/cylons/aaron.jpg",
      "assets/images/cylons/eight.jpg",
      "assets/images/people/jammer.jpg"
    ],
    key: "jammer",
    load: function() {
      loadImg(this);
    }
  },
  {
    q: "What position did Laura Roslin hold before she became president of the colonies?",
    qImg: "assets/images/people/laura-roslin.jpg",
    a: ["teacher", "cabinet secretary", "lunch lady", "personal assistant to William Adama", "staff seargent", "she was unemployed"],
    key: "cabinet secretary",
    load: function() {
      loadText(this);
    }
  },
  {
    q: "which of the following characters appeard in the original 1978 Battlestar Galactica?",
    a: [
      "assets/images/cylons/saul.jpg",
      "assets/images/cylons/ellen.jpg",
      "assets/images/cylons/one.jpg",
      "assets/images/people/tom.jpg",
      "assets/images/people/william-adama.jpg",
      "assets/images/people/laura-roslin.jpg"
    ],
    key: "tom",
    load: function() {
      loadImg(this);
    }
  },
  {
    q: "Who is shown in the picture above?",
    qImg: "assets/images/people/hot-dog.jpg",
    a: ["Hot Dog", "Apollo", "Boomer", "Crashdown", "Helo", "Tyrol"],
    key: "Hot Dog",
    load: function() {
      loadText(this);
    }
  }
];
//TODO add transitions between questions and show correct answer
function markAnswer() {
  stopTimer();
  var mark = parseInt($(this).attr("value"));
  if (mark === 1) {
    $(this).css("background-color", "#f5f5f5");
    paperIn.css("background-color", "lightgreen");
  } else {
    $(this).css("background-color", "#f5f5f5");
    paperIn.css("background-color", "crimson");
  }

  setTimeout(function() {
    score += mark;
    questionIndex++;
    if (questionIndex === questions.length) {
      var finalScore = (score / questions.length) * 100;
      question.empty();
      answer.empty();
      number.empty();
      pulseIn();
      setTimeout(function() {
        pulseOut();
      }, 500);
      setTimeout(function() {
        var endMessage;
        if (score === 1) {
          endMessage = "You got " + score + " answer correct for a score of " + finalScore + "%";
        } else {
          endMessage = "You got " + score + " answers correct for a score of " + finalScore + "%";
        }

        question.text(endMessage);
        var button = $("<button>");
        button.text("play again");
        button.on("click", function() {
          score = 0;
          questionIndex = 0;
          questions.sort(function(a, b) {
            return 0.5 - Math.random();
          });
          questions[questionIndex].load();
        });
        answer.append(button);
      }, 1000);
      return;
    }
    questions[questionIndex].load();
  }, 1000);
}

function loadText(obj) {
  question.empty();
  answer.empty();
  number.empty();
  pulseIn();
  setTimeout(function() {
    pulseOut();
  }, 500);
  setTimeout(function() {
    number.text("Question " + (questionIndex + 1));
    var img = $("<img>");
    img.attr("src", obj.qImg);
    img.addClass("image");
    question.append(img).append(obj.q);
    var ans = obj.a.sort(function(a, b) {
      return 0.5 - Math.random();
    });
    $.each(ans, function(index, value) {
      var val = 0;
      if (value.includes(obj.key)) val = 1;
      var ans = $("<div>");
      ans
        .addClass("text answer")
        .attr("value", val.toString())
        .text(value)
        .on("click", markAnswer);
      answer.append(ans);
    });
    startTimer();
  }, 1000);
}

function loadImg(obj) {
  question.empty();
  answer.empty();
  number.empty();
  pulseIn();
  setTimeout(function() {
    pulseOut();
  }, 500);
  setTimeout(function() {
    number.text("Question " + (questionIndex + 1));
    question.text(obj.q);
    var answers = obj.a.sort(function(a, b) {
      return 0.5 - Math.random();
    });
    $.each(answers, function(index, value) {
      var val = 0;
      if (value.includes(obj.key)) val = 1;
      var img = $("<img>");
      img
        .attr("src", value)
        .attr("value", val.toString())
        .addClass("image answer")
        .on("click", markAnswer);
      answer.append(img);
    });
    startTimer();
  }, 1000);
}

function startGame() {
  pulseIn();
  setTimeout(function() {
    score = 0;
    questionIndex = 0;
    var message = $("<div>");
    message.text("Are you ready to test your knowledge of Battlestar Galactica?");
    var button = $("<button>");
    button.text("play");
    timerBar.append(timer);

    paperIn
      .append(number)
      .append(question)
      .append(answer)
      .append(timerBar);
    question.append(message);
    answer.append(button);
    button.on("click", function() {
      questions.sort(function(a, b) {
        return 0.5 - Math.random();
      });
      questions[questionIndex].load();
    });
  }, 500);
  setTimeout(function() {
    pulseOut();
  }, 1010);
}

$(document).ready(function() {
  var x = $(window).width();
  var y = $(window).height();
  console.log(x + ", " + y + ", " + x / y);
  intro();
});

//variables for the intro

function intro() {
  var width;
  if ($(window).width() <= 690) {
    width = "72vw";
  } else {
    width = "440px";
  }
  //shrink the logo
  logo.animate({ width: "108.75px", height: "108.75px" }, 3000, function() {
    //then fade the logo out
    logo.animate({ opacity: "0" }, 1000);
    //and fade in the header
    header.animate({ opacity: 0.8 }, 1000, function() {
      //then widen the header to show both right and left logos
      header.animate({ width: width, top: "10px" }, 2000);
      titleDiv.animate({ opacity: "1" }, 2000);
    });
  });
  paperOut.attr("id", "paper-out");
  paperIn.attr("id", "paper-in");
  paperOut.append(paperIn);
  setTimeout(function() {
    container.append(paperOut);
    startGame();
  }, 6000);
}

function pulseIn() {
  paperIn.animate({ width: "0", height: "0" }, 500);
}

function pulseOut() {
  paperIn.css("background-color", "#ffffff");
  paperIn.animate({ width: "98%", height: "98%" }, 500);
}
