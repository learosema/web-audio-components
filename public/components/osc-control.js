export default class OscControl extends HTMLElement {

  static register() {
    customElements.define('x-osc-control', OscControl);   
  }

  static get observedProperties() {
    return ["type", "freq", "autostart"];
  }

  get type() {
    return this._osc.type;
  }

  set type(val) {
    this.setAttribute('type', val);
    this._osc.type = type;
  }

  get freq() {
    return this._osc.frequency.value;
  }

  set freq(val) {
    this._osc.frequency.value = val;
    this.setAttribute('freq', val)
  }
  
  constructor() {
    super();
    this._osc = this.AC.createOscillator();
    this.attachShadow({mode: 'open'});
    this.setProps();
    this.render();  
  }

  setProps() {
    OscControl.observedProperties.map(prop => {
      const val = this.getAttribute(prop);
      if (val !== null) {
        this[prop] = val;
      }
    });
  }

  connectedCallback() {
    console.log("OscControl connected.");
    // TODO: add event Listeners and stuff :)

  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name in this.props) {
      this.props[name] = newValue;
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./components/osc-control.css">
      <span id="type">${this.type}</span>
      <input type="range" min="1" max="1000" step="1" value="${this.freq}">
    `
  }

  get AC() {
    const audioElement = document.querySelector('x-audio')
    if (audioElement) {
      return audioElement.context;
    }
  }

  start() {
    this._osc.start();
  }

}