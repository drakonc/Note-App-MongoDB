import { Router } from "express";
import { isAuthenticated, } from "../../Helpers/auth";
import notasController from "../../Controllers/Notas/NotasController";

class NotasRouter {

    public router: Router;

    constructor() {
        this.router = Router()
        this.config();
    }

    private config(): void {
        this.router.get('/notes', isAuthenticated, notasController.renderNotas);
        this.router.get('/notes/search/:id',isAuthenticated, notasController.renderOneNotas);
        this.router.get('/notes/add', isAuthenticated, notasController.renderNotasForms);
        this.router.post('/notes/new-note', isAuthenticated, notasController.crearNewNatas);
        this.router.get('/notes/edit/:id', isAuthenticated, notasController.renderEditForms);
        this.router.put('/notes/updat-note/:id', isAuthenticated, notasController.updateNatas);
        this.router.delete('/notes/delete/:id', isAuthenticated, notasController.deleteNatas);
    }

}

const notasRouter = new NotasRouter();
export default notasRouter.router;