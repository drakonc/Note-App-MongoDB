import { Request, Response } from 'express';

class IndexController {

    public index(req: Request, res: Response) {
        res.status(200).render('index');
    }

}

const indexController = new IndexController();
export default indexController;