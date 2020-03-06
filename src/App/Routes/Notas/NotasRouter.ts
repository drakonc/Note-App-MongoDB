import { Router } from "express";
import notasController from "../../Controllers/Notas/notasController";

class NotasRouter {

    public router: Router;

    constructor() {
        this.router = Router()
        this.config();
    }

    private config(): void {
        this.router.get('/', notasController.index);
    }

}

const notasRouter = new NotasRouter();
export default notasRouter.router;