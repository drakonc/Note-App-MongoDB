import { Router } from "express";
import notasController from "../../Controllers/Notas/NotasController";

class NotasRouter {

    public router: Router;

    constructor() {
        this.router = Router()
        this.config();
    }

    private config(): void {
        this.router.get('/notes', notasController.renderNotas);
        this.router.get('/notes/search/:id', notasController.renderOneNotas);
        this.router.get('/notes/add', notasController.renderNotasForms);
        this.router.post('/notes/new-note', notasController.crearNewNatas);
        this.router.get('/notes/edit/:id', notasController.renderEditForms);
        this.router.put('/notes/updat-note/:id', notasController.updateNatas);
        this.router.delete('/notes/delete/:id', notasController.deleteNatas);
    }

}

const notasRouter = new NotasRouter();
export default notasRouter.router;