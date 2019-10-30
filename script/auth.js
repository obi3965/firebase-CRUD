const loginform = document.querySelector("#login-form");
loginform.addEventListener("submit", function(event) {
  event.preventDefault();

  document.querySelector("#login_error").textContent = "";

  const email = loginform.username.value;
  const password = loginform.password.value;

  // HUSK VALIDERING !!!

  auth
    .signInWithEmailAndPassword(email, password)
    .then(function(cred) {
      console.log(cred);
      loginform.reset(); // ryd loginformen
    })
    .catch(function(error) {
      document.querySelector("#login_error").textContent = error.message;
    });
});

const logout_button = document.querySelector("#logout");
logout_button.addEventListener("click", function() {
  auth.signOut().then(function() {
    console.log("brugeren er logget af");
  });
});



signupform.addEventListener("submit", function(event) {
    event.preventDefault();
  
    document.querySelector("#signinform_error").textContent = "";
  
    const email = signupform.username.value;
    const password = signupform.password.value;
  
    // HUSK VALIDERING, og der burde nok være et "GENTAG PASSWORD" felt!
  
    auth.createUserWithEmailAndPassword(email, password)
      .then(function(cred) {
        console.log(cred);
        signupform.reset();
      })
      .catch(function(error) {
        document.querySelector("#signinform_error").textContent = error.message;
      });
  });



  auth.onAuthStateChanged(function(user) {
    if (user != null) {
      db.collection("todos").onSnapshot(
        function(snapshot) {
          let changes = snapshot.docChanges();
          changes.forEach(function(change) {
            if (change.type == "added") {
              renderTodo(change.doc);
            } else if (change.type == "removed") {
              let li = todos.querySelector(`li[data-id="${change.doc.id}"]`);
              todos.removeChild(li);
            }
          });
        },
        function(error) {
          console.log(error.message);
        }
      );
  
     document.getElementById("todos").style.display = "block";
     document.getElementById("add-todo").style.display = "block"
     
    } else {
        document.getElementById("todos").style.display = "none";
        document.getElementById("add-todo").style.display = "none"
    }
  });


  auth.createUserWithEmailAndPassword(email, password)
   .then(function (cred) {
      console.log(cred);
      // tilføj en return handling, som giver os muligheden for at "chaine" .then()
      return db.collection('users').doc(cred.user.uid).set({
         fullname: signupform.Fullname.value
      })
   })
   .then(function () {
      signupform.reset();
   })
   .catch(function (error) {
      document.querySelector('#signinform_error').textContent = error.message;
   });