(function () {
  const inputValor = document.getElementById("valor-temperatura");
  const selectOrigen = document.getElementById("unidad-origen");
  const selectDestino = document.getElementById("unidad-destino");
  const btnConvertir = document.getElementById("btn-convertir");
  const resultCard = document.getElementById("resultado-temperatura");
  const resultText = document.getElementById("texto-resultado-temperatura");

  const ETIQUETAS = {
    celsius: "°C",
    fahrenheit: "°F",
    kelvin: "K"
  };

  function aCelsius(valor, unidad) {
    if (unidad === "celsius") return valor;
    if (unidad === "fahrenheit") return (valor - 32) * (5 / 9);
    if (unidad === "kelvin") return valor - 273.15;
    return NaN;
  }

  function desdeCelsius(celsius, unidad) {
    if (unidad === "celsius") return celsius;
    if (unidad === "fahrenheit") return celsius * (9 / 5) + 32;
    if (unidad === "kelvin") return celsius + 273.15;
    return NaN;
  }

  function formularioCompleto() {
    const valor = inputValor.value.trim();
    const origen = selectOrigen.value;
    const destino = selectDestino.value;
    return valor !== "" && origen !== "" && destino !== "";
  }

  function actualizarBoton() {
    btnConvertir.disabled = !formularioCompleto();
  }

  function convertir() {
    const valor = parseFloat(inputValor.value);
    const origen = selectOrigen.value;
    const destino = selectDestino.value;

    if (isNaN(valor)) return;

    const celsius = aCelsius(valor, origen);
    const resultado = desdeCelsius(celsius, destino);

    resultText.textContent =
      valor + " " + ETIQUETAS[origen] + " = " +
      resultado.toFixed(2) + " " + ETIQUETAS[destino];

    resultCard.hidden = false;
  }

  [inputValor, selectOrigen, selectDestino].forEach(function (el) {
    el.addEventListener("input", actualizarBoton);
    el.addEventListener("change", actualizarBoton);
  });

  btnConvertir.addEventListener("click", convertir);
})();
