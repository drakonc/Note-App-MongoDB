import { Router } from "express";
import userController from "../../Controllers/User/UserController";

class UserRouter {

    public router: Router;

    constructor(){
        this.router = Router();
        this.config();
    }

    private config():void{
        this.router.get('/user/signup',userController.renderSignUpForm);
        this.router.post('/user/signup',userController.signup);
        this.router.get('/user/signin',userController.renderSignInForm);
        this.router.post('/user/signin',userController.signIn);
        this.router.get('/user/logout',userController.logout);
    }

}

const userRouter = new UserRouter();
export default userRouter.router;