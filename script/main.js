const todos = document.querySelector("#todos"); // ul tagget i html dokumentet
function renderTodo(doc) {
    // opret elementerne
    let li = document.createElement("li");
    let title = document.createElement("h3");
    let content = document.createElement("p");
    let isDone = document.createElement("p");
    let checkbox = document.createElement("input");
    let remove = document.createElement("button");

    // sæt attributter og værdier
    li.setAttribute("data-id", doc.id);
    title.textContent = doc.data().title;
    content.textContent = doc.data().content;
    isDone.textContent = "Afsluttet? ";
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = doc.data().isDone;
    isDone.appendChild(checkbox);
    remove.textContent = "Delete";

    // knyt elementerne til ul tagget
    li.appendChild(title);
    li.appendChild(content);
    li.appendChild(isDone);
    li.appendChild(remove);
    todos.appendChild(li);

    //to update our data
    checkbox.addEventListener('change', function (event) {
        event.stopPropagation();
        db.collection("todos")
            .doc(doc.id)
            .update({
                isDone: checkbox.checked
            })
            .then(function () {
                window.location.replace(window.location);
            });
    })

    //to delete the data
    remove.addEventListener("click", function (event) {
        if (confirm("Vil du slette?")) {
            let id = event.target.parentElement.getAttribute("data-id");
            db.collection("todos")
                .doc(id)
                .delete()
                .then(function () {
                    window.location.replace(window.location);
                });
        }
    });

}
//to insert into database and show it on page
const form = document.querySelector("#add-todo");
// indsæt data
form.addEventListener("submit", function (event) {
    event.preventDefault();

    // HUSK VALIDERING!!!!!

    db.collection("todos")
        .add({
            title: form.title.value,
            content: form.content.value,
            isDone: form.isDone != undefined ? form.isDone.checked : false
        })
        .then(function () {
            window.location.replace(window.location);
        });
});






db.collection("todos").onSnapshot(function (snapshot) {
    let changes = snapshot.docChanges();
    changes.forEach(function (change) {
        if (change.type == "added") {
            renderTodo(change.doc);
        } else if (change.type == "removed") {
            let li = todos.querySelector(`[data-id=${change.doc.id}]`);
            todos.removeChild(li);
        }
    });
});









//       db.collection("todos")
//       .get()
//       .then(function(snapshot) {
//        snapshot.docs.forEach(function(doc) {
//           renderTodo(doc);
//     });
//   });