(function () {
  const MESES = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const selectDia = document.getElementById("dia-nacimiento");
  const selectMes = document.getElementById("mes-nacimiento");
  const selectAnio = document.getElementById("anio-nacimiento");
  const form = document.getElementById("form-nacimiento");
  const errorEl = document.getElementById("error-nacimiento");
  const resultCard = document.getElementById("resultado-nacimiento");
  const resultText = document.getElementById("texto-resultado-nacimiento");

  const anioActual = new Date().getFullYear();

  function poblarSelectores() {
    for (let d = 1; d <= 31; d++) {
      const opt = document.createElement("option");
      opt.value = String(d);
      opt.textContent = String(d);
      selectDia.appendChild(opt);
    }

    MESES.forEach(function (nombre, i) {
      const opt = document.createElement("option");
      opt.value = String(i + 1);
      opt.textContent = nombre;
      selectMes.appendChild(opt);
    });

    for (let a = anioActual; a >= anioActual - 120; a--) {
      const opt = document.createElement("option");
      opt.value = String(a);
      opt.textContent = String(a);
      selectAnio.appendChild(opt);
    }
  }

  function esBisiesto(anio) {
    return (anio % 4 === 0 && anio % 100 !== 0) || anio % 400 === 0;
  }

  function diasEnMes(mes, anio) {
    const dias = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (mes === 2 && esBisiesto(anio)) return 29;
    return dias[mes - 1];
  }

  function validarFecha(dia, mes, anio) {
    if (!dia || !mes || !anio) {
      return "Completa día, mes y año.";
    }

    const d = parseInt(dia, 10);
    const m = parseInt(mes, 10);
    const a = parseInt(anio, 10);

    if (m < 1 || m > 12) {
      return "El mes seleccionado no es válido.";
    }

    const maxDias = diasEnMes(m, a);
    if (d < 1 || d > maxDias) {
      return "El día no es válido para el mes y año seleccionados.";
    }

    const fecha = new Date(a, m - 1, d);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fecha > hoy) {
      return "La fecha de nacimiento no puede ser futura.";
    }

    if (a < anioActual - 120) {
      return "El año ingresado no es coherente.";
    }

    return null;
  }

  function calcularTiempoTranscurrido(fechaNacimiento) {
    const hoy = new Date();
    let anios = hoy.getFullYear() - fechaNacimiento.getFullYear();
    let meses = hoy.getMonth() - fechaNacimiento.getMonth();

    if (hoy.getDate() < fechaNacimiento.getDate()) {
      meses -= 1;
    }

    if (meses < 0) {
      anios -= 1;
      meses += 12;
    }

    return { anios, meses };
  }

  function mostrarError(mensaje) {
    errorEl.textContent = mensaje;
    errorEl.hidden = false;
    resultCard.hidden = true;
  }

  function ocultarError() {
    errorEl.hidden = true;
    errorEl.textContent = "";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    ocultarError();

    const dia = selectDia.value;
    const mes = selectMes.value;
    const anio = selectAnio.value;
    const error = validarFecha(dia, mes, anio);

    if (error) {
      mostrarError(error);
      return;
    }

    const fecha = new Date(parseInt(anio, 10), parseInt(mes, 10) - 1, parseInt(dia, 10));
    const { anios, meses } = calcularTiempoTranscurrido(fecha);

    const etiquetaAnios = anios === 1 ? "año" : "años";
    const etiquetaMeses = meses === 1 ? "mes" : "meses";

    resultText.textContent =
      "Han transcurrido " + anios + " " + etiquetaAnios + " y " + meses + " " + etiquetaMeses +
      " desde el " + dia + " de " + MESES[parseInt(mes, 10) - 1] + " de " + anio + ".";

    resultCard.hidden = false;
  });

  poblarSelectores();
})();
