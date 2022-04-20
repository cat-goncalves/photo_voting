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

    // function writeUserData(idNum, name) {
    //   const db = getDatabase();
    //   set(ref(db, 'data/' + name), {
    //     id: idNum,
    //     name: name
    //   });
    // }
    // writeUserData(1, "coffee")
    // writeUserData(2, "tea")
    // writeUserData(3, "matcha")


    onValue(dbRef, (snapshot) => {
        let data = snapshot.val()
        console.log(data.coffee)
        console.log(data.totalVotes)
    });

    function updateVotes(name) {

    const updates = {};
    updates[`data/${name}/votes`] = increment(1);
    updates[`data/totalVotes`] = increment(1);
    update(ref(db), updates);

    }

    updateVotes("coffee")