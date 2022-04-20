// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
import { getDatabase, ref, increment, update, onValue, set } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpN0f9kZLgHkNLuKIw-5g2UaNMiOnPpRw",
  authDomain: "real-time-voting-7a34e.firebaseapp.com",
  projectId: "real-time-voting-7a34e",
  storageBucket: "real-time-voting-7a34e.appspot.com",
  messagingSenderId: "1080254888870",
  appId: "1:1080254888870:web:a334e1e5ec02a17598ad67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const dbRef = ref(db, "data/");
//array of database entry names
const dbEntries = ["fish", "girl", "paddle", "zebra", "eagle", "boat"]

//local storage for user vote
let hasCastVote = localStorage.getItem("national-geographic-vote")
let data

// event listener for every vote button
document.querySelectorAll(".voteButton").forEach(element => {
  element.addEventListener("click", castVote)
})

// Firebase Syntax that allows us to create db entries
function writeUserData(idNum, name) {
  const db = getDatabase();
  set(ref(db, 'data/' + name), {
    id: idNum,
    name: name,
    votes: 0
  });
}
// writeUserData(0, "totalVotes")
// writeUserData(1, "fish")
// writeUserData(2, "girl")
// writeUserData(3, "paddle")
// writeUserData(4, "zebra")
// writeUserData(5, "eagle")
// writeUserData(6, "boat")

// Firebase onValue() method that loads db contents on page load
onValue(dbRef, (snapshot) => {
    data = snapshot.val()
    
    // conditional of vote cast is inside so we are sure the data variable is assigned to db entries
    // if true, button is removed to prevent user from voting twice
    if(hasCastVote == "true") {
      removeButton()
    }
});

// kicks off sequence of voting steps. The event target(button) value corresponds to photo name in db
// updateVotes and storeVoteLocally called from here as steps 2 and 3
function castVote(event) {
  let vote = event.target.value
  updateVotes(vote)
  storeVoteLocally()
}

// Firebase syntax for incrementing the matching db path
// name is a parameter that holds the photo name taken from button click value
function updateVotes(name) {
  const updates = {};
  updates[`data/${name}/votes`] = increment(1);
  updates[`data/totalVotes`] = increment(1);
  update(ref(db), updates);
}

// assigning the key for "national-geographic-vote" to the String value true
// fires removeButton
function storeVoteLocally() {
  localStorage.setItem("national-geographic-vote", "true")
  removeButton()
}


// Loops through each instance of .voteButton and deleted the (button) element
function removeButton() {
  document.querySelectorAll(".voteButton").forEach(button => {
    button.remove()
  })
  displayVotes()
}

// Loops through array of db entry name (dbEntries) and displays the corresponding results in the voting area
function displayVotes() {
  dbEntries.forEach(photoName => {
    let resultsDiv = document.querySelector(`#${photoName}Results`)
    let p = document.createElement("p")
    p.innerText = data[photoName].votes  + " out of " + data.totalVotes
    resultsDiv.appendChild(p)
  })
}
