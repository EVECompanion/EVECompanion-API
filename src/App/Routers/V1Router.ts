import V1Controller from "../Controllers/V1Controller";
import GenericRouter from "./GenericRouter";

class V1Router extends GenericRouter {

    controller: V1Controller;

    constructor() {
        super();
        this.controller = new V1Controller();
        this.setup();
    }

    setup(): void {
        // Setup Sub-Routers/Endpoints here
        this.expressRouter.get("/version", this.controller.getVersion);
        this.expressRouter.get("/sde", this.controller.downloadSDE);
    }

}

export default V1Router;