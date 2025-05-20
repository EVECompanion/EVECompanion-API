import GenericRouter from "./GenericRouter";
import V1Router from "./V1Router";
import V2Router from "./V2Router";

class MainRouter extends GenericRouter {

    v1Router: V1Router;
    v2Router: V2Router;

    constructor() {
        super();
        this.v1Router = new V1Router();
        this.v2Router = new V2Router();
        this.setup();
    }

    setup(): void {
        // Setup Sub-Routers/Endpoints here
        this.expressRouter.use("/v1", this.v1Router.expressRouter);
        this.expressRouter.use("/v2", this.v2Router.expressRouter);
    }

}

export default MainRouter;