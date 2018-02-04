const synth = window.speechSynthesis;

async function main() {
  const textArea = document.querySelector('.input-text');
  const pauseBtn = document.getElementById('pause-btn');
  const speakBtn = document.getElementById('speak-btn');
  const stopBtn = document.getElementById('stop-btn');
  const selectEl = document.querySelector('select');
  const volumeSlider = document.getElementById('volume-slider');
  const volumeValueEl = document.getElementById('volume-slider-value');
  const pitchSlider = document.getElementById('pitch-slider');
  const pitchValueEl = document.getElementById('pitch-slider-value');
  const rateSlider = document.getElementById('rate-slider');
  const rateValueEl = document.getElementById('rate-slider-value');

  setupEventListeners();
  const voices = await getVoices();

  const speakThis = new SpeechSynthesisUtterance();

  speakThis.volume = volumeSlider.value;
  speakThis.pitch = pitchSlider.value;
  speakThis.rate = rateSlider.value;

  voices.forEach((voice, i) => {
    const el = document.createElement('option');
    el.value = i;
    el.innerText = `${voice.name} - ${voice.lang}`;
    // Set default language to US English
    if (voice.lang.toLowerCase().replace(/[-_]/g, '') == 'enus') {
      el.setAttribute('selected', '');
      speakThis.voice = voices[i];
    }
    selectEl.appendChild(el);
  });

  speakThis.onstart = () => {
    speakBtn.setAttribute('disabled', '');
    pauseBtn.removeAttribute('disabled');
    stopBtn.removeAttribute('disabled');
  };

  speakThis.onend = () => {
    console.log(synth);
    speakBtn.removeAttribute('disabled');
    pauseBtn.setAttribute('disabled', '');
    stopBtn.setAttribute('disabled', '');
  };

  function setupEventListeners() {
    // SLIDERS
    volumeSlider.addEventListener('input', () => {
      volumeValueEl.innerText = `${Math.floor(volumeSlider.value * 100)}%`;
      speakThis.volume = volumeSlider.value;
    });

    pitchSlider.addEventListener('input', () => {
      pitchValueEl.innerText = Number(pitchSlider.value).toFixed(2);
      speakThis.pitch = pitchSlider.value;
    });

    rateSlider.addEventListener('input', () => {
      rateValueEl.innerText = Number(rateSlider.value).toFixed(2);
      speakThis.rate = rateSlider.value;
    });
    selectEl.addEventListener('change', e => {
      speakThis.voice = voices[e.target.value];
    });

    // BUTTONS
    speakBtn.addEventListener('click', () => {
      speakThis.text = textArea.value;
      synth.speak(speakThis);
    });

    stopBtn.addEventListener('click', () => {
      synth.cancel();
    });

    // Workaround because `synth.pause` keeps returning `false`
    let paused = false;
    pauseBtn.addEventListener('click', () => {
      if (!paused) {
        synth.pause();
        paused = true;
        pauseBtn.innerText = 'Resume';
      } else {
        synth.resume();
        paused = false;
        pauseBtn.innerText = 'Pause';
      }
    });
  }
}

main();

async function getVoices() {
  // Firefox loads voices synchronosly
  const voices = synth.getVoices();
  if (voices.length) {
    return voices;
  }
  // Chrome asyncronosly
  return await new Promise(resolve => {
    synth.onvoiceschanged = () => {
      resolve(synth.getVoices());
    };
  });
}
