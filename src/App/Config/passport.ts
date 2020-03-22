import passport from "passport";
import passportLocal from "passport-local";
const User = require("../Models/User");

export class Passport {

    constructor() { }

    configPasport(){
        const LocalStrategy = passportLocal.Strategy;

        passport.use(new LocalStrategy(
            { usernameField:'email', passwordField: 'password'},
            async (email:String,password:String,done: any)=>{
                //Confirmar el Correo
                const user = await User.findOne({email:email});
                if(!user){
                    return done(null, false,{message: 'Usuario No Encontrado'});
                }else{
                    //Confirmar Contraseña
                    const match = await user.matchPassword(password);
                    if(match){
                        return done(null,user);
                    }else{
                        return done(null,false,{message:'Contraseña Incorrecta'})
                    }
                }
            }
        ));

        passport.serializeUser((user:any, done:any) => {
            done(null,user.id);
        });

        passport.deserializeUser((id, done:any) => {
            User.findById(id,(err:any,user:any)=> {
                done(err,user)
            })
        })
    }
}
    
    