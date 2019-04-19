import audioContext from '../audio-context.js';

export default class OscControl extends HTMLElement {

  static register() {
    customElements.define('x-osc-control', OscControl);
  }

  static observedAttributes = ["type", "freq", "autostart"];

  get type() {
    return this.getAttribute('type') || 'sine';
  }

  set type(val) {
    this.setAttribute('type', val);
  }

  get freq() {
    return this.getAttribute('freq') || 0;
  }

  set freq(val) {
    this.setAttribute('freq', val)
  }

  constructor() {
    super();
    this._osc = audioContext.createOscillator();
    this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    console.log("connected Callback.");
    if (this.freqSlider) {
      return;
    }
    this.initUI();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // TODO: attributeChangedCallback may be called before connectedCallback
    //       is ready

    // some debug output:
    console.log("attributeChanged Callback.", name, oldValue, newValue, 
      this.waveSelect ? "waveSelect" : "no_waveSelect",
      this.freqSlider ? "freqSlider" : "no_freqSlider"
    );
    if (name === "type" && this.waveSelect) {
      this.waveSelect.value = newValue;
      this._osc.type = newValue;
      return;
    }
    if (name === "freq" && this.freqSlider) {
      this.freqSlider.value = newValue;
      this._osc.frequency.value = newValue;
      return;
    }
  }

  readAttributes() {
    // properties may have been set before the element has been
    // upgraded, so just read and set the attributes again.
    this.constructor.observedAttributes.map(attr => {
      const val = this.getAttribute(attr);
      this.setAttribute(attr, val);
    });
  }

  initUI() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./components/osc-control.css">
      <select id="waveSelect">
        <option>sine</option>
        <option>square</option>
        <option>triangle</option>
      </select>
      <input id="freqSlider" type="range" min="1" max="1000" step="1" value="">
    `
    this.freqSlider = this.shadowRoot.getElementById('freqSlider');
    this.freqSlider.addEventListener('change', e => {
      this.freq = this.freqSlider.value;
    });
    this.waveSelect = this.shadowRoot.getElementById('waveSelect')
    this.waveSelect.addEventListener('change', e => {
      this.type = this.waveSelect.value;
    })
    this.readAttributes();
  }

  start() {
    this._osc.start();
  }

}