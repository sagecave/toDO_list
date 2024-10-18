
<script>
window.addEventListener("load", (event) => {
  console.log("page is fully loaded");
  if (todoStorage === null) {
    listValues = [];
  } else {
    listValues = JSON.parse(todoStorage);
  }
  if (assigmentDoneStorage === null) {
    listDone = [];
  } else {
    listDone = JSON.parse(assigmentDoneStorage);
  }
  listGenerator();
  listGeneratorDone();
});
// list array indholder opgaver
let listValues = [];
let listDone = [];
const todoStorage = localStorage.getItem("todoStorage");
const assigmentDoneStorage = localStorage.getItem("assigmentDoneStorage");
const inputButton = document.querySelector(".addTaskButton");
const deleteTextButton = document.querySelector(".deleteText");
const listDoneContainer = document.querySelector(".doneList");
const inputOfValues = document.querySelector("input");

inputOfValues.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    inputButton.click();
  }
});

// ind sætter værdien i input til et arry
inputButton.addEventListener("click", () => {
  let inputText = inputOfValues.value;
  listValues.push(inputText);
  console.log(listValues);
  updateStrage();
  listGenerator();
});

deleteTextButton.addEventListener("click", () => {
  listDone.splice(0);
  updateStrage();
  listGeneratorDone();
});
// laver text til original todo list
function listGenerator() {
  const listContainer = document.querySelector(".activeList");
  listContainer.innerHTML = ``;
  listValues.forEach((assigment, id) => {
    listContainer.innerHTML += `<li class="todo_assigment" data-id="${id}"> ${assigment} </li>`;
  });

  document.querySelectorAll(".todo_assigment").forEach((each, id) => {
    each.addEventListener("click", removeAssigment);
  });
}
// laver text til done liste, efter det er tjekket af
function listGeneratorDone() {
  listDoneContainer.innerHTML = ``;
  listDone.forEach((assigment, id) => {
    listDoneContainer.innerHTML += `<li class="todo_assigment" data-id="${id}"> ${assigment} </li>`;
  });

  //   document.querySelectorAll(".todo_assigment").forEach((each, id) => {
  //     each.addEventListener("click", removeAssigment);
  //   });
}

function updateStrage() {
  localStorage.setItem("todoStorage", JSON.stringify(listValues));
  localStorage.setItem("assigmentDoneStorage", JSON.stringify(listDone));
}

function removeAssigment(event) {
  let listItemNumbers = event.target.dataset.id;
  let listItemValue = event.target.textContent;
  listDone.push(listItemValue);
  listValues.splice(listItemNumbers, 1);
  console.log("list Done", listDone);

  listGenerator();
  listGeneratorDone();
  updateStrage();
}

</script>
