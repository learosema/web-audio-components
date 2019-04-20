import App from "./components/app.js";
import OscControl from './components/osc-control.js';
import GainControl from './components/gain-control.js';
import Destination from './components/destination.js';

const components = [App, OscControl, GainControl, Destination];

components.map(c => c.register());
