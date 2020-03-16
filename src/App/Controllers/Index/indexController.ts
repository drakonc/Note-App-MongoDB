import { Request, Response } from 'express';

class IndexController {

    public index(req: Request, res: Response) {
        const nombre = 'Jose Castro';
        const js = 'Index/index.js';
        res.status(200).render('Views/Index/Index', { nombre, js });
    }

    public about(req: Request, res: Response) {
        res.status(200).render('Views/About/About');
    }

}

const indexController = new IndexController();
export default indexController;