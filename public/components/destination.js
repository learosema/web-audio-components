import audioContext from '../audio-context.js';

export default class Destination extends HTMLElement {

  static register() {
    customElements.define('x-destination', Destination);
  }

  get destination() {
    return this._destination;
  }

  constructor () {
    super();
    this._destination = audioContext.destination;
  }

}