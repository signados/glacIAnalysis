const glaciares = document.querySelectorAll('.glaciar');

const degradationFactors = Array.from({ length: glaciares.length }, () => Math.random() + 0.5);

function generateOpacity(index, value) {
          const minYear = 2025;
          const maxYear = 2050;
          const normalizedValue = (value - minYear) / (maxYear - minYear); // Normaliza el valor entre 0 y 1
          const uniqueFactor = degradationFactors[index]; // Factor único basado en el índice

          return Math.max(0, 1 - normalizedValue * uniqueFactor); // Ajusta la opacidad usando el factor único, asegurando que no sea negativa
}

function updateOpacity(value) {
          glaciares.forEach((glaciar, index) => {
                    glaciar.style.opacity = generateOpacity(index, value);
          });
}

// Agregar event listeners a los inputs de rango
document.querySelectorAll('.range-slider input[type="range"]').forEach(function (input) {
          input.addEventListener('input', function () {
                    var value = this.value;
                    console.log(value);
                    // Actualizar la opacidad de los glaciares
                    updateOpacity(value);
          });
});
