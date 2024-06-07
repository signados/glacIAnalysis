// Obtener todos los elementos con clase 'glaciar'
const glaciares = document.querySelectorAll('.glaciar');

// Generar factores únicos de degradación para cada glaciar
const degradationFactors = Array.from({ length: glaciares.length }, () => Math.random() + 0.5);

// Función para generar una opacidad única basada en el índice y el valor del input
function generateOpacity(index, value) {
    const minYear = 2024;
    const maxYear = 2100;
    const normalizedValue = (value - minYear) / (maxYear - minYear); // Normaliza el valor entre 0 y 1
    const uniqueFactor = degradationFactors[index]; // Factor único basado en el índice

    return Math.max(0, 1 - normalizedValue * uniqueFactor); // Ajusta la opacidad usando el factor único, asegurando que no sea negativa
}

// Función para actualizar la opacidad de los glaciares basada en el valor del input
function updateOpacity(value) {
    glaciares.forEach((glaciar, index) => {
        glaciar.style.opacity = generateOpacity(index, value); // Ajusta la opacidad usando la función generateOpacity
    });
}

// Agregar event listeners a los inputs de rango
document.querySelectorAll('.range-slider input[type="range"]').forEach(function (input) {
    input.addEventListener('input', function () {
        var value = this.value;

        // Actualizar la opacidad de los glaciares
        updateOpacity(value);
    });
});

// Inicializar la opacidad al cargar la página
updateOpacity(2024);