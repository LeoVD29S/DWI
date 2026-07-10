(function () {
  const tasks = [];
  let nextId = 1;

  const form = document.getElementById("form-tareas");
  const inputDescripcion = document.getElementById("descripcion-tarea");
  const listaEl = document.getElementById("lista-tareas");
  const emptyState = document.getElementById("lista-vacia");

  function obtenerTareasOrdenadas() {
    const pendientes = tasks.filter(function (t) { return !t.completada; });
    const completadas = tasks.filter(function (t) { return t.completada; });
    return pendientes.concat(completadas);
  }

  function renderTasks() {
    listaEl.innerHTML = "";
    const ordenadas = obtenerTareasOrdenadas();

    emptyState.classList.toggle("hidden", ordenadas.length > 0);

    ordenadas.forEach(function (task) {
      const li = document.createElement("li");
      li.className = "task-item" + (task.completada ? " completed" : "");
      li.dataset.id = String(task.id);

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "task-checkbox";
      checkbox.checked = task.completada;
      checkbox.setAttribute("aria-label", "Marcar tarea como completada");

      const label = document.createElement("span");
      label.className = "task-label";
      label.textContent = task.descripcion;

      const btnEliminar = document.createElement("button");
      btnEliminar.type = "button";
      btnEliminar.className = "btn btn-danger";
      btnEliminar.textContent = "Eliminar";
      btnEliminar.setAttribute("aria-label", "Eliminar tarea");

      checkbox.addEventListener("change", function () {
        task.completada = checkbox.checked;
        renderTasks();
      });

      btnEliminar.addEventListener("click", function () {
        const index = tasks.findIndex(function (t) { return t.id === task.id; });
        if (index !== -1) {
          tasks.splice(index, 1);
          renderTasks();
        }
      });

      li.appendChild(checkbox);
      li.appendChild(label);
      li.appendChild(btnEliminar);
      listaEl.appendChild(li);
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const descripcion = inputDescripcion.value.trim();
    if (!descripcion) return;

    tasks.push({
      id: nextId++,
      descripcion: descripcion,
      completada: false
    });

    inputDescripcion.value = "";
    renderTasks();
  });

  renderTasks();
})();
