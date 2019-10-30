// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDoMXGJXgqN19JBOnLu9U0aBqKB5EtW8Xs",
    authDomain: "fir-crud-bc9cb.firebaseapp.com",
    databaseURL: "https://fir-crud-bc9cb.firebaseio.com",
    projectId: "fir-crud-bc9cb",
    storageBucket: "fir-crud-bc9cb.appspot.com",
    messagingSenderId: "302725449017",
    appId: "1:302725449017:web:ce0fb401414667e30954e8",
    measurementId: "G-ZLV2LCBF52"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 


  //references to database
  const db = firebase.firestore();

  // referer til authentication service 
const auth = firebase.auth();