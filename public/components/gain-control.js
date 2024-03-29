import audioContext from "../audio-context.js";

export default class GainControl extends HTMLElement {
  static observedAttributes = ["value", "connect"];
  _initialized = false;

  static register() {
    customElements.define("x-gain-control", GainControl);
  }

  constructor() {
    super();
    this._gain = audioContext.createGain();
    this.attachShadow({ mode: "open" });
  }

  get value() {
    return this.getAttribute("value");
  }

  set value(val) {
    this.setAttribute("value", val);
  }

  connectedCallback() {
    if (!this._initialized) {
      this.initUI();
      this._initialized = true;
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "value") {
      if (this.gainSlider) {
        this.gainSlider.value = newValue;
      }
      this._gain.gain.value = newValue;
    }
    if (name === "connect") {
      const target = this.getRootNode().querySelector("#" + newValue);
      if (target.nodeName === "X-DESTINATION") {
        customElements.whenDefined("x-destination").then(() => {
          this._gain.connect(target.destination);
        });
      }
    }
  }

  initUI() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./components/gain-control.css">
      <input id="gainSlider" type="range" min="0" max="1" step="0.01"
                             value="${this._gain.gain.value}">
    `;
    this.gainSlider = this.shadowRoot.getElementById("gainSlider");
    this.gainSlider.addEventListener("input", e => {
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }
      this.value = this.gainSlider.value;
    });
  }
}
