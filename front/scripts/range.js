document.querySelectorAll('.range-slider input[type="range"]').forEach(function (input) {
          input.addEventListener('input', function () {
                    var parent = this.parentNode;
                    var value = this.value;
                    var textValue = this.value;

                    // Si hay un prefijo definido, se agrega al valor de texto
                    var prefix = parent.style.getPropertyValue('--prefix') || '';
                    textValue = prefix + textValue;

                    console.log('value', value, 'textValue', textValue);

          });
});