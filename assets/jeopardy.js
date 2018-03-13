// window.onload=function(){
//   $(function(){
//       if(window.location.protocol==="https:")
//           window.location.protocol="http";
//   });
// }

// Initialize Firebase
var config = {
  apiKey: "AIzaSyB9lkXWDXDgzL4-_C9BlIdwX7Gk5jfH33w",
  authDomain: "jeopardy-d8b0c.firebaseapp.com",
  databaseURL: "https://jeopardy-d8b0c.firebaseio.com",
  projectId: "jeopardy-d8b0c",
  storageBucket: "jeopardy-d8b0c.appspot.com",
  messagingSenderId: "630242489436"
};
firebase.initializeApp(config);
var database = firebase.database();
var displayName = 'User';
var userScore = 0;



function signIn() {
  if (!firebase.auth().currentUser) {

    var provider = new firebase.auth.GoogleAuthProvider();

    // provider.addScope('https://www.googleapis.com/auth/plus.login');

    firebase.auth().signInWithRedirect(provider);
  } else {
    firebase.auth().signOut();
  }
}

function initApp() {
  firebase.auth().getRedirectResult().then(function (result) {
    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // ...
    }
    // The signed-in user info.
    var user = result.user;
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  // An error happened.

  // observer to check and see if a user is signed in.
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      displayName = user.displayName;
      $('#user-name').text(displayName + ' Score: $' + userScore);
      // put displayName in area for name.
      // when game is over put name in leaderboard in order
      // repalace button with sign out button.
      // User is signed in.
    } else {
      // normal sign in button.
      // No user is signed in.
    }
  });
  $('#name-submit').on('click', signIn);

}

window.onload = function () {
  console.log('one');
  initApp();
};


$(document).ready(function () {

  // GLOBAL VARIABLES
  var difficulty = 'Easy';
  var answer;
  var allCategories = [306, 136, 42, 780, 21, 105, 25, 103, 7];
  var categoryOne = allCategories[Math.floor(Math.random() * allCategories.length)];
  var categoryOneName;
  var categoryTwo = allCategories[Math.floor(Math.random() * allCategories.length)];
  var categoryTwoName;
  var categoryThreeName;
  var categoryThree = allCategories[Math.floor(Math.random() * allCategories.length)];
  var chosenCategories = [];
  var category1Q1;
  var category1Q2;
  var category1Q3;
  var category2Q1;
  var category2Q2;
  var category2Q3;
  var category3Q1;
  var category3Q2;
  var category3Q3;
  var category1A1;
  var category1A2;
  var category1A3;
  var category2A1;
  var category2A2;
  var category2A3;
  var category3A1;
  var category3A2;
  var category3A3;
  var category1RandomQuestions = [];
  var category2RandomQuestions = [];
  var category3RandomQuestions = [];
  var category1RandomAnswers = [];
  var category2RandomAnswers = [];
  var category3RandomAnswers = [];
  var categoryID1;
  var categoryID2;
  var categoryID3;
  var answerLowerCase;
  var questionScore;
  var questionCounter = 0;
  var leaderBoard;
  var gifArrary;
  var wrongImg;
  var rightImg;
  var clickedDiv;

  function getWrongGIF() {
    var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=ZGm4k7GW4QuBRafZmsbPRaol8zqSLXZh&q=snl-saturday-night-live-will-ferrell-jeopardy-no&limit=1';
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(queryURL);
      console.log(response);
      console.log(response.data.length);
      for (var i = 0; i < response.data.length; i++) {
        var src = response.data[i].images.fixed_width.url
        console.log(src);
        //<iframe src="https://giphy.com/embed/3o72wEFZZJGu1FcF3i" width="480" height="269" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/snl-saturday-night-live-will-ferrell-3o72wEFZZJGu1FcF3i"></a></p>
        wrongImg = '<iframe src="' + src + '" width="480" height="269" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>';
        console.log(wrongImg);
      }
    });
  }

  function getRightGIF() {
    var queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=ZGm4k7GW4QuBRafZmsbPRaol8zqSLXZh&q=jeopardy-contestant&limit=1';
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(queryURL);
      console.log(response);
      console.log(response.data.length);
      for (var i = 0; i < response.data.length; i++) {
        var src = response.data[i].images.fixed_width.url
        console.log(src);
        //<iframe src="https://giphy.com/embed/3o72wEFZZJGu1FcF3i" width="480" height="269" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/snl-saturday-night-live-will-ferrell-3o72wEFZZJGu1FcF3i"></a></p>
        rightImg = '<iframe src="' + src + '" width="480" height="269" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>';
        console.log(rightImg);
      }
    });
  }

  getWrongGIF();
  getRightGIF();

  function resetGame() {
    console.log('reset');
    console.log(displayName + " reset function", userScore + ' reset function');
    database.ref().push({
      name: displayName,
      score: userScore
    });
    location.reload();
  }

  function endGame() {
    //display modal for game over
    $('#correctWrong').text('Game Over!');
    $('#jeopardyAnswer').text('Your final score is:  $' + userScore);
    $('#answerModal').modal();
    $('#answerClose').on('click', function () {
      resetGame();
    });

  }

  database.ref().orderByChild('score').limitToLast(5).on('child_added', function (snapshot) {
    var childData = snapshot.val();
    $('#scores').prepend(childData.name + ': ' + childData.score + '<br>');
    console.log('childData' + childData);
    // ...

  });


  //CHOOSE 3 SEPERATE CATEGORIES
  function chooseCategories() {
    //GO DOWN THIS PATH IF THERE ARE DUPLICATE CATEGORIES
    if (chosenCategories == '' && (categoryOne == categoryTwo || categoryOne == categoryThree || categoryTwo == categoryThree)) {
      categoryOne = allCategories[Math.floor(Math.random() * allCategories.length)];
      categoryTwo = allCategories[Math.floor(Math.random() * allCategories.length)];
      categoryThree = allCategories[Math.floor(Math.random() * allCategories.length)];
      chooseCategories();
    }
    //IF THERE ARE NO DUPLICATE VALUES, STORE VALUES IN THE CHOSEN CATEGORIES ARRARY
    else {
      chosenCategories.push(categoryOne);
      console.log(categoryOne);
      chosenCategories.push(categoryTwo);
      chosenCategories.push(categoryThree);
      //CATEGORY 1 TITLE
      if (categoryOne == 42) {
        categoryOne = 'Sports';
      } else if (categoryOne == 306) {
        categoryOne = 'Potpourriiii';
      } else if (categoryOne == 136) {
        categoryOne = 'Stupid Answers';
      } else if (categoryOne == 780) {
        categoryOne = 'American History';
      } else if (categoryOne == 21) {
        categoryOne = 'Animals';
      } else if (categoryOne == 105) {
        categoryOne = '3 Letter Words';
      } else if (categoryOne == 25) {
        categoryOne = 'Science';
      } else if (categoryOne == 103) {
        categoryOne = 'Transportation';
      } else if (categoryOne == 7) {
        categoryOne = 'U.S. Cities';
      }
      //CATEGORY 2 TITLE
      if (categoryTwo == 42) {
        categoryTwo = 'Sports';
      } else if (categoryTwo == 306) {
        categoryTwo = 'Potpourriiii';
      } else if (categoryTwo == 136) {
        categoryTwo = 'Stupid Answers';
      } else if (categoryTwo == 780) {
        categoryTwo = 'American History';
      } else if (categoryTwo == 21) {
        categoryTwo = 'Animals';
      } else if (categoryTwo == 105) {
        categoryTwo = '3 Letter Words';
      } else if (categoryTwo == 25) {
        categoryTwo = 'Science';
      } else if (categoryTwo == 103) {
        categoryTwo = 'Transportation';
      } else if (categoryTwo == 7) {
        categoryTwo = 'U.S. Cities';
      }
      //CATEGORY 3 TITLES
      if (categoryThree == 42) {
        categoryThree = 'Sports';
      } else if (categoryThree == 306) {
        categoryThree = 'Potpourriiii';
      } else if (categoryThree == 136) {
        categoryThree = 'Stupid Answers';
      } else if (categoryThree == 780) {
        categoryThree = 'American History';
      } else if (categoryThree == 21) {
        categoryThree = 'Animals';
      } else if (categoryThree == 105) {
        categoryThree = '3 Letter Words';
      } else if (categoryThree == 25) {
        categoryThree = 'Science';
      } else if (categoryThree == 103) {
        categoryThree = 'Transportation';
      } else if (categoryThree == 7) {
        categoryThree = 'U.S. Cities';
      }
      //CHANGE CODE BELOW TO $('id where titles go').text(categoryOne)
      //$('#categories1').text(categoryOne);
      //$('#categories2').text(categoryThree);
      //$('#categories3').text(categoryTwo);
    }
  }
  //RUN FUNCTION TO CHOOSE CATEGORIES
  chooseCategories();

  //CHOOSE QUESTIONS BASED ON CHOSEN CATEGORIES
  function chooseQuestions() {
    //USER PATH IF THEY CHOSE EASY
    if (difficulty == 'Easy') {
      for (i = 0; i < chosenCategories.length; i++) {
        var queryURL = 'http://jservice.io/api/clues?value=200&value=100&value=300&value=200&category=' + chosenCategories[i];
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function (response) {
          for (var i = 0; i < chosenCategories.length; i++) {
            console.log(queryURL);
            console.log(response);

            //CHOOSE QUESTIONS FOR CATEGORY 1
            function category1QuestionPopulate() {
              //GO DOWN THIS PATH IF THE SAME QUESTION IS DUPLICATED
              if (category1Q1 == category1Q2 || category1Q1 == category1Q3 || category1Q2 == category1Q3) {
                var rand1;
                var rand2;
                var rand3;
                categoryID1 = response[i].category_id;
                //console.log(categoryID);
                rand1 = Math.floor(Math.random() * response.length);
                rand2 = Math.floor(Math.random() * response.length);
                rand3 = Math.floor(Math.random() * response.length);
                category1Q1 = response[rand1].question;
                category1A1 = response[rand1].answer;
                category1Q2 = response[rand2].question;
                category1A2 = response[rand2].answer;
                category1Q3 = response[rand3].question;
                category1A3 = response[rand3].answer;
                category1QuestionPopulate();
              }
              //GO DOWN THIS PATH IF NONE OF THE QUESTIONS ARE DUPLICATED
              else {
                categoryID1 = response[i].category_id;
                category1RandomQuestions = [];
                category1RandomAnswers = [];
                category1RandomQuestions.push(category1Q1);
                category1RandomQuestions.push(category1Q2);
                category1RandomQuestions.push(category1Q3);
                category1RandomAnswers.push(category1A1);
                category1RandomAnswers.push(category1A2);
                category1RandomAnswers.push(category1A3);
                console.log('Question Arrary: ' + category1RandomQuestions);
                console.log('Answer Arrary: ' + category1RandomAnswers);

                //CATEGORY 1 TITLES
                if (categoryID1 == 42) {
                  categoryOneName = 'Sports';
                } else if (categoryID1 == 306) {
                  categoryOneName = 'Potpourriiii';
                } else if (categoryID1 == 136) {
                  categoryOneName = 'Stupid Answers';
                } else if (categoryID1 == 780) {
                  categoryOneName = 'American History';
                } else if (categoryID1 == 21) {
                  categoryOneName = 'Animals';
                } else if (categoryID1 == 105) {
                  categoryOneName = '3 Letter Words';
                } else if (categoryID1 == 25) {
                  categoryOneName = 'Science';
                } else if (categoryID1 == 103) {
                  categoryOneName = 'Transportation';
                } else if (categoryID1 == 7) {
                  categoryOneName = 'U.S. Cities';
                }
                $('#categories1').text(categoryOneName);
              }
            }

            //CHOOSE QUESTIONS FOR CATEGORY 2
            function category2QuestionPopulate() {
              //GO DOWN THIS PATH IF THE SAME QUESTION IS DUPLICATED
              if (category2Q1 == category2Q2 || category2Q1 == category2Q3 || category2Q2 == category2Q3) {
                var rand4;
                var rand5;
                var rand6;
                categoryID2 = response[i].category_id;
                rand4 = Math.floor(Math.random() * response.length);
                rand5 = Math.floor(Math.random() * response.length);
                rand6 = Math.floor(Math.random() * response.length);
                category2Q1 = response[rand4].question;
                category2A1 = response[rand4].answer;
                category2Q2 = response[rand5].question;
                category2A2 = response[rand5].answer;
                category2Q3 = response[rand6].question;
                category2A3 = response[rand6].answer;
                category2QuestionPopulate();
              }
              //GO DOWN THIS PATH IF NONE OF THE QUESTIONS ARE DUPLICATED
              else {
                categoryID2 = response[i].category_id;
                category2RandomQuestions = [];
                category2RandomAnswers = [];
                category2RandomQuestions.push(category2Q1);
                category2RandomQuestions.push(category2Q2);
                category2RandomQuestions.push(category2Q3);
                category2RandomAnswers.push(category2A1);
                category2RandomAnswers.push(category2A2);
                category2RandomAnswers.push(category2A3);
                console.log('Question Arrary: ' + category2RandomQuestions);
                console.log('Answer Arrary: ' + category2RandomAnswers);

                //CATEGORY 2 TITLES
                if (categoryID2 == 42) {
                  categoryTwoName = 'Sports';
                } else if (categoryID2 == 306) {
                  categoryTwoName = 'Potpourriiii';
                } else if (categoryID2 == 136) {
                  categoryTwoName = 'Stupid Answers';
                } else if (categoryID2 == 780) {
                  categoryTwoName = 'American History';
                } else if (categoryID2 == 21) {
                  categoryTwoName = 'Animals';
                } else if (categoryID2 == 105) {
                  categoryTwoName = '3 Letter Words';
                } else if (categoryID2 == 25) {
                  categoryTwoName = 'Science';
                } else if (categoryID2 == 103) {
                  categoryTwoName = 'Transportation';
                } else if (categoryID2 == 7) {
                  categoryTwoName = 'U.S. Cities';
                }
                $('#categories2').text(categoryTwoName);
              }
            }

            //CHOOSE QUESTIONS FOR CATEGORY 3
            function category3QuestionPopulate() {
              //GO DOWN THIS PATH IF THE SAME QUESTIONS IS DUPLICATED
              if (category3Q1 == category3Q2 || category3Q1 == category3Q3 || category3Q2 == category3Q3) {
                var rand7;
                var rand8;
                var rand9;
                categoryID3 = response[i].category_id;
                rand7 = Math.floor(Math.random() * response.length);
                rand8 = Math.floor(Math.random() * response.length);
                rand9 = Math.floor(Math.random() * response.length);
                category3Q1 = response[rand7].question;
                category3A1 = response[rand7].answer;
                category3Q2 = response[rand8].question;
                category3A2 = response[rand8].answer;
                category3Q3 = response[rand9].question;
                category3A3 = response[rand9].answer;
                category3QuestionPopulate();
              }
              //GO DOWN THIS PATH IF NONE OF THE QUESTIONS ARE DUPLICATED
              else {
                categoryID3 = response[i].category_id;
                category3RandomQuestions = [];
                category3RandomAnswers = [];
                category3RandomQuestions.push(category3Q1);
                category3RandomQuestions.push(category3Q2);
                category3RandomQuestions.push(category3Q3);
                category3RandomAnswers.push(category3A1);
                category3RandomAnswers.push(category3A2);
                category3RandomAnswers.push(category3A3);
                console.log('Question Arrary: ' + category3RandomQuestions);
                console.log('Answer Arrary: ' + category3RandomAnswers);

                //CATEGORY 3 TITLES
                if (categoryID3 == 42) {
                  categoryThreeName = 'Sports';
                } else if (categoryID3 == 306) {
                  categoryThreeName = 'Potpourriiii';
                } else if (categoryID3 == 136) {
                  categoryThreeName = 'Stupid Answers';
                } else if (categoryID3 == 780) {
                  categoryThreeName = 'American History';
                } else if (categoryID3 == 21) {
                  categoryThreeName = 'Animals';
                } else if (categoryID3 == 105) {
                  categoryThreeName = '3 Letter Words';
                } else if (categoryID3 == 25) {
                  categoryThreeName = 'Science';
                } else if (categoryID3 == 103) {
                  categoryThreeName = 'Transportation';
                } else if (categoryID3 == 7) {
                  categoryThreeName = 'U.S. Cities';
                }
                $('#categories3').text(categoryThreeName);

              }
            }

            //FIRST ITERATION THROUGH RESPONSE - STORE VALUES FOR CATEGORY 1
            if (category1RandomQuestions == '') {
              //POPULATE CATEGORY 1 ARRARY
              return category1QuestionPopulate();
            }
            //SECOND ITERATION THROUGH RESPONSE - STORE VALUES FOR CATEGORY 2
            else if (category1RandomQuestions != '' && category2RandomQuestions == '' && category3RandomQuestions == '') {
              //POPULATE CATEGORY 2 ARRARY
              return category2QuestionPopulate();
            }
            //LAST ITERATION THROUGH ARRARY - STORE VALUES FOR CATEGORY 3
            else {
              //POPULATE CATEGORY 3 ARRARY
              return category3QuestionPopulate();
            }

          }
        });
      }
    }
    //USER PATH IF THEY CHOSE HARD
    else if (difficulty == 'Hard') {
      for (i = 0; i < chosenCategories.length; i++) {
        //Endpoint for hard http://jservice.io/api/clues?catagory=42&
        var queryURL = 'http://jservice.io/api/clues?value=500&value=600&value=700&value=500&value=500&category=' + chosenCategories[i];
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function (response) {
          for (var i = 0; i < chosenCategories.length; i++) {
            console.log(queryURL);
            console.log(response);

            //CHOOSE QUESTIONS FOR CATEGORY 1
            function category1QuestionPopulate() {
              //GO DOWN THIS PATH IF ANY QUESTIONS ARE DUPLICATED
              if (category1Q1 == category1Q2 || category1Q1 == category1Q3 || category1Q2 == category1Q3) {
                var rand1;
                var rand2;
                var rand3;
                rand1 = Math.floor(Math.random() * response.length);
                rand2 = Math.floor(Math.random() * response.length);
                rand3 = Math.floor(Math.random() * response.length);
                category1Q1 = response[rand1].question;
                category1A1 = response[rand1].answer;
                category1Q2 = response[rand2].question;
                category1A2 = response[rand2].answer;
                category1Q3 = response[rand3].question;
                category1A3 = response[rand3].answer;
                category1QuestionPopulate();
              }
              //GO DOWN THIS PATH IF NONE OF THE QUESTIONS ARE DUPLICATED
              else {
                category1RandomQuestions = [];
                category1RandomAnswers = [];
                category1RandomQuestions.push(category1Q1);
                category1RandomQuestions.push(category1Q2);
                category1RandomQuestions.push(category1Q3);
                category1RandomAnswers.push(category1A1);
                category1RandomAnswers.push(category1A2);
                category1RandomAnswers.push(category1A3);
                console.log('Category: ' + response[i].category_id);
                console.log('Question Arrary: ' + category1RandomQuestions);
                console.log('Answer Arrary: ' + category1RandomAnswers)
              }
            }

            //CHOOSE THE QUESTIONS FOR CATEGORY 2
            function category2QuestionPopulate() {
              //GO DOWN THIS PATH IF ANY QUESTIONS ARE DUPLICATED
              if (category2Q1 == category2Q2 || category2Q1 == category2Q3 || category2Q2 == category2Q3) {
                var rand4;
                var rand5;
                var rand6;
                rand4 = Math.floor(Math.random() * response.length);
                rand5 = Math.floor(Math.random() * response.length);
                rand6 = Math.floor(Math.random() * response.length);
                category2Q1 = response[rand4].question;
                category2A1 = response[rand4].answer;
                category2Q2 = response[rand5].question;
                category2A2 = response[rand5].answer;
                category2Q3 = response[rand6].question;
                category2A3 = response[rand6].answer;
                category2QuestionPopulate();
              }
              //GO DOWN THIS PATH IF NONE OF THE QUESTIONS ARE DUPLICATED
              else {
                category2RandomQuestions = [];
                category2RandomAnswers = [];
                category2RandomQuestions.push(category2Q1);
                category2RandomQuestions.push(category2Q2);
                category2RandomQuestions.push(category2Q3);
                category2RandomAnswers.push(category2A1);
                category2RandomAnswers.push(category2A2);
                category2RandomAnswers.push(category2A3);
                console.log('Category: ' + response[i].category_id);
                console.log('Question Arrary: ' + category2RandomQuestions);
                console.log('Answer Arrary: ' + category2RandomAnswers)
              }
            }

            //CHOOSE THE QUESTIONS FOR CATEGORY 3
            function category3QuestionPopulate() {
              //GO DOWN THIS PATH IF ANY OF THE QUESTIONS ARE DUPLICATED
              if (category3Q1 == category3Q2 || category3Q1 == category3Q3 || category3Q2 == category3Q3) {
                var rand7;
                var rand8;
                var rand9;
                rand7 = Math.floor(Math.random() * response.length);
                rand8 = Math.floor(Math.random() * response.length);
                rand9 = Math.floor(Math.random() * response.length);
                category3Q1 = response[rand7].question;
                category3A1 = response[rand7].answer;
                category3Q2 = response[rand8].question;
                category3A2 = response[rand8].answer;
                category3Q3 = response[rand9].question;
                category3A3 = response[rand9].answer;
                category3QuestionPopulate();
              }
              //GO DOWN THIS PATH IF NONE OF THE QUESTIONS ARE DUPLICATED
              else {
                category3RandomQuestions = [];
                category3RandomAnswers = [];
                category3RandomQuestions.push(category3Q1);
                category3RandomQuestions.push(category3Q2);
                category3RandomQuestions.push(category3Q3);
                category3RandomAnswers.push(category3A1);
                category3RandomAnswers.push(category3A2);
                category3RandomAnswers.push(category3A3);
                console.log('Category: ' + response[i].category_id);
                console.log('Question Arrary: ' + category3RandomQuestions);
                console.log('Answer Arrary: ' + category3RandomAnswers);
              }
            }
            //FIRST ITERATION THROUGH RESPONSE - STORE VALUES FOR CATEGORY 1
            if (category1RandomQuestions == '') {
              //POPULATE CATEGORY 1 ARRARY
              return category1QuestionPopulate();
            }
            //SECOND ITERATION THROUGH RESPONSE - STORE VALUES FOR CATEGORY 2
            else if (category1RandomQuestions != '' && category2RandomQuestions == '' && category3RandomQuestions == '') {
              //POPULATE CATEGORY 2 ARRARY
              return category2QuestionPopulate();
            }
            //LAST ITERATION THROUGH ARRARY - STORE VALUES FOR CATEGORY 3
            else {
              //POPULATE CATEGORY 3 ARRARY
              return category3QuestionPopulate();
            }
          }
        });
      }
    }
  }

  //ON CLICK - SELECT DIFFICULTY
  $('.difficulty').on('click', function () {
    difficulty = $(this).data('level');
    console.log(difficulty);
  });

  //ON CLICK EVENTS - SHOW QUESTIONS & CHECK ANSWERS
  $('.option-button').on('click', function () {
    if ($(this).data('question') == 'category1Q1') {
      questionScore = parseInt($(this).data('score'));
      answerLowerCase = category1A1.toLowerCase();
      $('#jeopardyQuestion').text(category1Q1);
      $('#myModal').modal({ keyboard: false });
      clickedDiv = $(this);
      //$(this).html();
      // alert(category1Q1);
    } else if ($(this).data('question') == 'category1Q2') {
      questionScore = parseInt($(this).data('score'));
      answerLowerCase = category1A2.toLowerCase();
      $('#jeopardyQuestion').text(category1Q2);
      $('#myModal').modal({ keyboard: false });
      clickedDiv = $(this);
      // alert(category1Q2);
    } else if ($(this).data('question') == 'category1Q3') {
      questionScore = parseInt($(this).data('score'));
      answerLowerCase = category1A3.toLowerCase();
      $('#jeopardyQuestion').text(category1Q3);
      $('#myModal').modal({ keyboard: false });
      clickedDiv = $(this);
      // alert(category1Q3);
    } else if ($(this).data('question') == 'category2Q1') {
      questionScore = parseInt($(this).data('score'));
      answerLowerCase = category2A1.toLowerCase();
      $('#jeopardyQuestion').text(category2Q1);
      $('#myModal').modal({ keyboard: false });
      clickedDiv = $(this);
      // alert(category2Q1);
    } else if ($(this).data('question') == 'category2Q2') {
      questionScore = parseInt($(this).data('score'));
      answerLowerCase = category2A2.toLowerCase();
      $('#jeopardyQuestion').text(category2Q2);
      $('#myModal').modal({ keyboard: false });
      clickedDiv = $(this);
      // alert(category2Q2);
    } else if ($(this).data('question') == 'category2Q3') {
      questionScore = parseInt($(this).data('score'));
      answerLowerCase = category2A3.toLowerCase();
      $('#jeopardyQuestion').text(category2Q3);
      $('#myModal').modal({ keyboard: false });
      clickedDiv = $(this);
      // alert(category2Q3);
    } else if ($(this).data('question') == 'category3Q1') {
      questionScore = parseInt($(this).data('score'));
      answerLowerCase = category3A1.toLowerCase();
      $('#jeopardyQuestion').text(category3Q1);
      $('#myModal').modal({ keyboard: false });
      clickedDiv = $(this);
      // alert(category3Q1);
    } else if ($(this).data('question') == 'category3Q2') {
      questionScore = parseInt($(this).data('score'));
      answerLowerCase = category3A2.toLowerCase();
      $('#jeopardyQuestion').text(category3Q2);
      $('#myModal').modal({ keyboard: false });
      clickedDiv = $(this);
      // alert(category3Q2);
    } else if ($(this).data('question') == 'category3Q3') {
      questionScore = parseInt($(this).data('score'));
      answerLowerCase = category3A3.toLowerCase();
      $('#jeopardyQuestion').text(category3Q3);
      $('#myModal').modal({ keyboard: false });
      clickedDiv = $(this);
      // alert(category3Q3);
    }
  });

  $('#submit').on('click', function () {
    event.preventDefault();
    var answer1 = $('#userAnswer').val().trim().toLowerCase();
    // var answerLowerCase = $(this).data('answer');
    console.log(answer1, answerLowerCase);
    if (answer1 == answerLowerCase) {
      userScore += questionScore;
      console.log(userScore);
      $('#user-name').text(displayName + ' Score: $' + userScore);
      $('#correctWrong').text('You are correct!');
      $('#jeopardyAnswer').text('The answer is: ' + answerLowerCase);
      $('#answerModal').modal();
      questionCounter++;
      clickedDiv.html(rightImg);
      if (questionCounter === 9) {
        endGame();
      }

    } else {
      userScore -= questionScore;
      $('#user-name').text(displayName + ' Score: $' + userScore);
      $('#correctWrong').text('You are incorrect!');
      $('#jeopardyAnswer').text('The answer is: ' + answerLowerCase);
      $('#answerModal').modal();
      clickedDiv.html(wrongImg);
      questionCounter++;
      if (questionCounter === 9) {
        endGame();
      }
    }

  });

  console.log(chosenCategories);
  //CHOOSE CATEGORIES AND QUESTIONS
  chooseQuestions();

});
