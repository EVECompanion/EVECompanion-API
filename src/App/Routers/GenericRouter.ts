import express from "express";

abstract class GenericRouter {
    
    public expressRouter: express.Router = express.Router({ mergeParams: true });

    constructor() { }

}

export default GenericRouter;