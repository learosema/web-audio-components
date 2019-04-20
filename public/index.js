import App from "./components/app.js";
import OscControl from './components/osc-control.js';
import GainControl from './components/gain-control.js';

const components = [App, OscControl, GainControl];

components.map(c => c.register());
