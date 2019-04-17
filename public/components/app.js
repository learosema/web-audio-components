export default class App extends HTMLElement {
  
  static register() {
    customElements.define('x-app', App);
  }

  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./components/app.css" />
      <x-osc-control type="square"></x-osc-control>
    `
  }
} 