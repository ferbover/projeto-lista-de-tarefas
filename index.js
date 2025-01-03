const form = document.querySelector("#todo-form");
const taskTitleInput = document.querySelector("#task-title-input");
const todoListUl = document.querySelector("#todo-list");

let tasks = [];

function renderTaskOnHtml(taskTitle, done = false) {
  //adicionando a nova tarefa no HTML
  const li = document.createElement("li");
  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.addEventListener("change", (evento) => {
    const liToToggle = evento.target.parentElement;
    const spanToToggle = liToToggle.querySelector("span");
    const done = evento.target.checked;
    if (done) {
      spanToToggle.style.textDecoration = "line-through";
    } else {
      spanToToggle.style.textDecoration = "none";
    }

    tasks = tasks.map((t) => {
      if (t.title === spanToToggle.textContent) {
        return {
          title: t.title,
          done: !t.done,
        };
      }
      return t;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
  input.checked = done;

  const span = document.createElement("span");
  span.textContent = taskTitle;

  if (done) {
    span.style.textDecoration = "line-through";
  }

  const button = document.createElement("button");
  button.textContent = "Remover";
  button.addEventListener("click", (evento) => {
    const liToRemove = evento.target.parentElement;

    const titleToRemove = liToRemove.querySelector("span").textContent;

    tasks = tasks.filter((t) => t.title !== titleToRemove);

    todoListUl.removeChild(liToRemove);

    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  li.appendChild(input);
  li.appendChild(span);
  li.appendChild(button);

  todoListUl.appendChild(li);
}

window.onload = () => {
  const tasksOnLocalStorage = localStorage.getItem("tasks");

  if (!tasksOnLocalStorage) return;
  tasks = JSON.parse(tasksOnLocalStorage);

  tasks.forEach((t) => {
    renderTaskOnHtml(t.title, t.done);
  });
};

form.addEventListener("submit", (evento) => {
  evento.preventDefault(); //evita o comportamento padrão de recarregar a página ao submeter o formulário

  const taskTitle = taskTitleInput.value;

  if (taskTitle.length < 3) {
    alert("Sua tarefa precisa ter, pelo menos, 3 caracteres.");
    return;
  }
  //adicionando a nova tarefa no array de tasks
  tasks.push({
    title: taskTitle,
    done: false,
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTaskOnHtml(taskTitle);

  taskTitleInput.value = "";
});
