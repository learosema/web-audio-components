export default class Audio extends HTMLElement {
  
  static register() {
    customElements.define('x-audio', Audio);
  }

  constructor() {
    super();
    this.audioContext = new AudioContext();
  }

  get context() {
    return this.audioContext;
  }


}