import { Request, Response, NextFunction } from 'express';

export function isAuthenticated(req: Request, res: Response, next:NextFunction){
    const url: string = req.url;
    const user = req.user;
    //Si la Sesion con pasport Existe da acceso a las ruta
    if(req.isAuthenticated()) { 
        console.log(url); 
        console.log(user); 
        return next(); 
    }

    req.flash('error_msg','No esta Autorizado');
    res.redirect('/user/signin');
}
