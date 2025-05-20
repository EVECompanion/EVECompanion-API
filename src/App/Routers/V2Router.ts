import V2Controller from "../Controllers/V2Controller";
import GenericRouter from "./GenericRouter";

class V2Router extends GenericRouter {

    controller: V2Controller;

    constructor() {
        super();
        this.controller = new V2Controller();
        this.setup();
    }

    setup(): void {
        // Setup Sub-Routers/Endpoints here
        this.expressRouter.get("/version", this.controller.getVersion);
        this.expressRouter.get("/sde", this.controller.downloadSDE);
    }

}

export default V2Router;