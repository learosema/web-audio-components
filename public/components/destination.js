import audioContext from '../audio-context.js';

export default class Destination {

  static register() {
    customElements.define('x-destination', Destination);
  }

  constructor () {
    super();
    this.destination = audioContext.destination;
  }

}