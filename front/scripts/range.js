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

function updateModelViewerSrc(year) {
          const modelViewerBig = document.querySelector('#modelViewerBig');
          let newSrc;
          if (year > 2045) {
                    newSrc = './assets/glaciar/2050.glb';
          } else if (year > 2040) {
                    newSrc = './assets/glaciar/2045.glb';
          } else if (year > 2035) {
                    newSrc = './assets/glaciar/2040.glb';
          } else if (year > 2030) {
                    newSrc = './assets/glaciar/2035.glb';
          } else if (year > 2025) {
                    newSrc = './assets/glaciar/2030.glb';
          } else {
                    newSrc = './assets/glaciar/2025.glb';
          }
          modelViewerBig.setAttribute('src', newSrc);
}


function isSeguimosIgualSelected() {
          return document.querySelector('#option-1').checked;
}

// Agregar event listeners a los inputs de rango
document.querySelectorAll('.range-slider input[type="range"]').forEach(function (input) {
          input.addEventListener('input', function () {
                    const year = parseInt(this.value, 10); // Ensure the value is an integer
                    var value = this.value;
                    console.log(value);
                    // Actualizar la opacidad de los glaciares

                    if (isSeguimosIgualSelected()) {
                              updateOpacity(year);
                              updateModelViewerSrc(year);
                    }
          });
});


