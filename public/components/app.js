export default class App extends HTMLElement {
  static register() {
    customElements.define("x-app", App);
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./components/app.css" />
      <header>
        <h1>Web Audio Components</h1>
      </header>
      <main>
        <x-osc-control id="osc1" type="sine" freq="55" connect="gain1" start></x-osc-control>
        <x-gain-control id="gain1" value="0.1" connect="dest"></x-gain-control>
        <x-destination id="dest"></x-destination>
      </main>
    `;
  }
}
