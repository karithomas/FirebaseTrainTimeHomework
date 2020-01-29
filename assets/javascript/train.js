const firebaseConfig = {
    apiKey: "AIzaSyArof4R54lcbYI5V-fZOiEZdf32YZS_jVI",
    authDomain: "train-time-ff344.firebaseapp.com",
    databaseURL: "https://train-time-ff344.firebaseio.com",
    projectId: "train-time-ff344",
    storageBucket: "",
    messagingSenderId: "513803982476",
    appId: "1:513803982476:web:a3d5163d4864ca8df68da9"
  };
  // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

 
 var database = firebase.database();

 var tName;
 var dest;
 var freq = 0;
 var mAway = 0;
 var trainOne = 0;
 var nextTrain = 0;

  $("#addBtn").on("click", function(event) {
    event.preventDefault();
  
    tName = $("#inputTrain").val().trim();
    dest = $("#destTrain").val().trim();
    trainOne = $("#oneInput").val().trim();
    freq = $("#frequency").val().trim();
  
    database.ref().push({
      tName: tName,
      dest: dest,
      trainOne: trainOne,
      freq: freq,
      nextTrain: nextTrain,
    });

    tName = $("#inputTrain").val("");
    dest = $("destTrain").val("");
    trainOne = $("#oneInput").val("");
    freq = $("#frequency").val("");
  });

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    var firstTrainConv = moment(childSnapshot.val().trainOne, "hh:mm").subtract(1, "years");
    var timeDifference = moment().diff(moment(firstTrainConv), "minutes");
    var timeRemain = timeDifference % childSnapshot.val().freq;
    var mAway = childSnapshot.val().freq - timeRemain;
    var nextTrain = moment().add(mAway, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");
    var firebaseName = childSnapshot.val().tName;
    var firebaseDest = childSnapshot.val().dest;
    var firebaseFreq = childSnapshot.val().freq;

    // user input janx
    $("#tTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseDest + "</td><td>" + firebaseFreq + "</td><td>" + nextTrain + "</td><td>" + mAway + "</td></tr>");
  
  }, function(errorObj){
    console.log("errors handled: " + errorObj.code);
  });