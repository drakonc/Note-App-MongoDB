import { Request, Response } from 'express';

class IndexController {

    public index(req: Request, res: Response) {
        res.status(200).render('Views/Index/Index');
    }

    public about(req: Request, res: Response) {
        res.status(200).render('Views/About/About');
    }

}

const indexController = new IndexController();
export default indexController;