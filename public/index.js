import App from "./components/app.js";
import OscControl from './components/osc-control.js';
import Audio from './components/audio.js';

const components = [App, Audio, OscControl];

components.map(c => c.register());
