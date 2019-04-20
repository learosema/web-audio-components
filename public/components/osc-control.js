import audioContext from '../audio-context.js';

export default class OscControl extends HTMLElement {

  static observedAttributes = ["type", "freq", "start", "connect"];

  _initialized = false;
  _started = false;

  static register() {
    customElements.define('x-osc-control', OscControl);
  }

  constructor() {
    super();
    this._osc = audioContext.createOscillator();
    this.attachShadow({mode: 'open'});
  }

  get type() {
    return this.getAttribute('type') || 'sine';
  }

  set type(val) {
    this.setAttribute('type', val);
  }

  get freq() {
    return this.getAttribute('freq') || '440';
  }

  set freq(val) {
    this.setAttribute('freq', val)
  }

  connectedCallback() {
    if (this.freqSlider) {
      return;
    }
    this.initUI();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "type") {
      if (this.waveSelect) {
        this.waveSelect.value = newValue;
      }
      this._osc.type = newValue;
      return;
    }
    if (name === "freq") {
      if (this.freqSlider) {
        this.freqSlider.value = newValue;
      }
      this._osc.frequency.value = newValue;
      return;
    }
    if (name === "connect") {
      const target = document.getElementById(newValue)
      if (target.nodeName === 'X-GAIN-CONTROL') {
        // TODO: after element upgrade
        // this._osc.connect(target._gain);
        return;
      }
      if (target.nodeName === 'X-DESTINATION') {
        // TODO: after element upgrade
        // this._osc.connect(target.destination);
        return;
      }
    }
    if (name === "autostart") {
      this.start();
    }
  }

  initUI() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./components/osc-control.css">
      <select id="waveSelect">
        <option${this._osc.type === 'sine'?' selected':''}>sine</option>
        <option${this._osc.type === 'square'?' selected':''}>square</option>
        <option${this._osc.type === 'triangle'?' selected':''}>triangle</option>
        <option${this._osc.type === 'sawtooth'?' selected':''}>sawtooth</option>
      </select>
      <input id="freqSlider" type="range" min="1" max="1000" step="1" value="${this._osc.frequency.value}">
    `
    this.freqSlider = this.shadowRoot.getElementById('freqSlider');
    this.freqSlider.addEventListener('change', e => {
      this.freq = this.freqSlider.value;
    });
    this.waveSelect = this.shadowRoot.getElementById('waveSelect')
    this.waveSelect.addEventListener('change', e => {
      this.type = this.waveSelect.value;
    });
  }

  start() {
    if (! this._started) {
      this._osc.start();
      this._started = true;
      return true;
    }
    return false;
  }

}