import { Request, Response } from 'express';

class NotasController {

    public index(req: Request, res: Response) {
        res.status(200).render('Views/Index/Index');
    }

    public about(req: Request, res: Response) {
        res.status(200).render('Views/About/About');
    }

}

const notasController = new NotasController();
export default notasController;