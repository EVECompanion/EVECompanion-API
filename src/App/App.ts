import express from "express";
import MainRouter from "./Routers/MainRouter";
import logService from "../services/logger";
import morgan from "morgan";

const logger = logService(module);

class App {

    private port: number;
    private expressApp: express.Application;
    private mainRouter: MainRouter;

    constructor(port: number) {
        this.expressApp = express();
        this.mainRouter = new MainRouter();
        this.port = port;
    }

    start(): void {
        this.setupAPI();
    }

    private setupAPI(): void {
        logger.info("Setting up API.");

        // Register morgan for request logging.
        this.expressApp.use(morgan(`:date[iso] - :method :url HTTP/:http-version" :status :res[content-length] - :response-time ms`));
        
        // Register the Main Router.
        this.expressApp.use("/", this.mainRouter.expressRouter);
        
        // Use a default router to handle all invalid routes
        this.expressApp.use((req: express.Request, res: express.Response) => {
            res.status(404);
            // Route does not exist, 
            // just send an empty response with an 404 - Not Found HTTP Status Code.
            res.send();
        });

        this.listen(this.port);
    }

    private listen(port: number): void {
        this.expressApp.listen(port, () => {
            logger.info("Listening on port %i", port);
        });
    }

}

export default App;