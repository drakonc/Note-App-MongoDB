import { Request,Response } from "express";
import passport from "passport";
const User = require("../../Models/User");

class UserController {

    public renderSignUpForm(req: Request, res: Response) {
        res.render('Views/User/Signup');
    }

    public async signup(req: Request, res: Response) {
        const js = 'User/user.js';
        let errors = []
        const {nombre,email,password,Confirm_password} = req.body;

        if (password != Confirm_password) 
            errors.push({ text: "Las Contraseñas No Coinciden." });
        
        if (password.length < 4) 
            errors.push({ text: "La Contraseña Tiene que tener mas de 8 Caracteres." });
        

        if(errors.length > 0) { 
            res.render('Views/User/Signup',{nombre,email,password,errors,js});
        }
        else{
            const emailUser = await User.findOne({email:email});
            if(emailUser){
                req.flash('error_msg','El Correo ya se encuentra registrado en el sistema'); 
                res.redirect('/user/signup');
            }
            else{
                const newUser = new User({nombre,email,password});
                newUser.password = await newUser.encrypPassword(password);
                await newUser.save();
                req.flash("success_msg", "Registreo Satisfactorio.");
                res.redirect('/user/signin');
            }           
        }
    }

    public renderSignInForm(req: Request, res: Response) {
        res.render('Views/User/Signin');
    }


    public signIn = passport.authenticate('local',{
        failureRedirect:'/user/signin',
        successRedirect: '/',
        failureFlash: true
    });

    public logout(req: Request, res: Response) {
        req.logout();
        req.flash("success_msg", "Sesion Cerrada.");
        res.redirect('/user/signin');
    }

}

const userController = new UserController();
export default userController;