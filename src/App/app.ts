import express, { Application, Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import exphbs from "express-handlebars";
import session from "express-session";
import flash from "connect-flash";
import methodOverride from "method-override";
import morgan from "morgan";
import path from "path";
import passport from "passport";
import { Passport } from "./Config/passport";
import { MongoDB } from "./Config/database";


//Rutas
import indexRouter from "./Routes/Index/indexRouter";
import notasRouter from "./Routes/Notas/NotasRouter";
import userRouter from "./Routes/User/UserRouter";
import erroRouter from "./Routes/404/404Router";

const rutas: any[] = [indexRouter, notasRouter,userRouter,erroRouter]

export class Aplicacion {

	private app: Application;
	private port?: number | string;
	private db = new MongoDB();
	private pt = new Passport()

	constructor(port?: number | string) {
		config();
		this.port = port;
		this.app = express();
		this.pt.configPasport();
		this.Settings();
		this.Middleware();
		this.GlobalVariables();
		this.Routers();
	}

	private Settings(): void {
		this.app.set("port", this.port || process.env.PORT || 4000);
		this.app.set("views", path.join(__dirname, "Views"));
		this.app.engine(".hbs", exphbs({
			layoutsDir: path.join(this.app.get("views"), "Layouts"),
			partialsDir: path.join(this.app.get("views"), "Partials"),
			defaultLayout: "Main",
			extname: ".hbs"
			//helpers: require('./Helpers/handlebars')
		}));
		this.app.set('view engine', '.hbs');
	}

	private Middleware(): void {
		this.app.use(morgan("dev"));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(methodOverride('_method'));
		this.app.use(session({
			secret:'secret',
			resave:true,
			saveUninitialized:true
		}));
		this.app.use(passport.initialize());
		this.app.use(passport.session());
		this.app.use(flash());
	}

	private GlobalVariables(): void {
		this.app.use((req: Request, res: Response, next: NextFunction) => {
			res.locals.success_msg =req.flash('success_msg'); 
			res.locals.error_msg = req.flash('error_msg');
			res.locals.error = req.flash('error');
			res.locals.user = req.user || null;
			next();
		})
	}

	private Routers(): void {
		this.app.use(express.static(path.join(__dirname, 'Public')));
		this.app.use(rutas);
	}

	public Start() {
		this.app.listen(this.app.get("port"));
		console.log(`>>> Server on Port: ${this.app.get("port")} <<<`);
		this.db.connect();
	}
}