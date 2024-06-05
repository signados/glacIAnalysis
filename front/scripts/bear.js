AFRAME.registerComponent("walk", {
          init: function () {
                    this.model = null;
                    this.mixer = null;
                    var el = this.el;

                    el.addEventListener(
                              "click",
                              function () {
                                        var model = el.getObject3D("mesh");
                                        if (model) {
                                                  this.move(model, 4000);
                                        } else {
                                                  el.addEventListener(
                                                            "model-loaded",
                                                            function (e) {
                                                                      this.move(e.detail.model, 3000);
                                                            }.bind(this)
                                                  );
                                        }
                                        el.setAttribute(
                                                  "animation",
                                                  "property: position; to: 0 0 -1; dur: 4000; easing: linear; loop: false"
                                        );
                              }.bind(this)
                    );
          },
          move: function (model, duration) {
                    this.model = model;
                    this.mixer = new THREE.AnimationMixer(model);
                    this.model.animations.forEach((animation) => {
                              this.mixer.clipAction(animation, model).play();
                    });
                    setTimeout(() => {
                              this.model.animations.forEach((animation) => {
                                        this.mixer.clipAction(animation, model).stop();
                              });
                              speech(document.querySelector("#hello"));
                    }, duration);
          },
          tick: function (t, dt) {
                    if (this.mixer && !isNaN(dt)) {
                              this.mixer.update(dt / 1000);
                    }
          },
});

const synth = window.speechSynthesis;
const inputForm = document.querySelector("form");
const voiceSelect = document.querySelector("select");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector(".pitch-value");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector(".rate-value");

let voices = [];

function populateVoiceList() {
          voices = synth.getVoices().sort(function (a, b) {
                    const aname = a.name.toUpperCase();
                    const bname = b.name.toUpperCase();
                    if (aname < bname) {
                              return -1;
                    } else if (aname == bname) {
                              return 0;
                    } else {
                              return +1;
                    }
          });
          const selectedIndex =
                    voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
          voiceSelect.innerHTML = "";


          const option = document.createElement("option");
          option.textContent = `Google español (es-ES)`;
          option.setAttribute("data-lang", "es-ES");
          option.setAttribute("data-name", "Google español");
          voiceSelect.appendChild(option);

          //<option data-lang="es-ES" data-name="Google español">Google español (es-ES)</option>
          //Google español (es-ES)

          voiceSelect.selectedIndex = selectedIndex;
}

populateVoiceList();

if (speechSynthesis.onvoiceschanged !== undefined) {
          speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak(inputTxt) {
          if (synth.speaking) {
                    console.error("speechSynthesis.speaking");
                    return; //Para poner en cola
          }
          if (inputTxt.textContent !== "") {
                    // Divide el texto en oraciones o segmentos.
                    const textSegments = inputTxt.textContent.match(/[^\.!\?]+[\.!\?]+/g) || [
                              inputTxt.textContent,
                    ];

                    let currentSegment = 0;

                    const speakNextSegment = () => {
                              if (currentSegment < textSegments.length) {
                                        const segmentText = textSegments[currentSegment];
                                        const utterThis = new SpeechSynthesisUtterance(segmentText);

                                        utterThis.onend = function (event) {
                                                  console.log("Finished speaking segment.");
                                                  currentSegment++;
                                                  speakNextSegment(); // Recursivamente habla el siguiente segmento
                                        };

                                        utterThis.onerror = function (event) {
                                                  console.error("SpeechSynthesisUtterance.onerror");
                                        };

                                        const selectedOption =
                                                  voiceSelect.selectedOptions[0].getAttribute("data-name");
                                        for (let i = 0; i < voices.length; i++) {
                                                  if (voices[i].name === selectedOption) {
                                                            utterThis.voice = voices[i];
                                                            break;
                                                  }
                                        }
                                        utterThis.pitch = pitch.value;
                                        utterThis.rate = rate.value;
                                        synth.speak(utterThis);
                              }
                    };
                    speakNextSegment();
          }
} // Inicia hablando el primer segmento

function speech(inputTxt) {
          speak(inputTxt);
          inputTxt.blur();
}

pitch.onchange = function () {
          pitchValue.textContent = pitch.value;
};

rate.onchange = function () {
          rateValue.textContent = rate.value;
};

voiceSelect.onchange = function () {
          speak();
};
