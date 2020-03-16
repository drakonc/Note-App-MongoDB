import { Request, Response } from 'express';

class ErroController {

    public index(req: Request, res: Response) {
        var js: String = '404/404.js'
        const url: string = req.url;
        res.status(404).render('Views/404/404', { layout: 'Main404.hbs', js, url });
    }

}

const errorController = new ErroController();
export default errorController;