import App from "./App/App";
import config from "./config";

const app = new App(config.port);
app.start();