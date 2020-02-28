import { Router } from "express";
import errorController from "../../Controllers/404/404Controller";

class ErrorRouter {

    public router: Router;

    constructor() {
        this.router = Router()
        this.config();
    }

    private config(): void {
        this.router.get('*', errorController.index);
    }

}

const erroRouter = new ErrorRouter();
export default erroRouter.router;