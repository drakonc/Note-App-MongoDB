import { Request, Response } from 'express';

class ErroController {

    public index(req: Request, res: Response) {
        const url: string = req.url;
        res.status(404).render('Views/404/404', { url, layout: 'main404.hbs' });
    }

}

const errorController = new ErroController();
export default errorController;