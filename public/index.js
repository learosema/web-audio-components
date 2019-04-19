import App from "./components/app.js";
import OscControl from './components/osc-control.js';

const components = [App, OscControl];

components.map(c => c.register());
