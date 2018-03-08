

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
var displayName;


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
  firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // ...
    }
    // The signed-in user info.
    var user = result.user;
  }).catch(function(error) {
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
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    displayName = user.displayName;
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

window.onload = function() {
  console.log('one');
  initApp();
};

// easy/hard buttons, when one is pushed, they disapear.
// when one of the buttons are pushed the table for the game appears.

$('.easyHard').on('click', function() {
  $('.easyHard').toggle();
  difficulty = $(this).data('difficulty');
});
