import express, { Application, Request, Response, NextFunction } from "express";
import exphbs from "express-handlebars";
import morgan from "morgan";
import path from "path";

//Rutas
import indexRouter from "./Routes/indexRouter";
import erroRouter from "./Routes/404/404Router";

const rutas: any[] = [indexRouter, erroRouter]

export class Aplicacion {

	public app: Application;
	public port?: number | string;

	constructor(port?: number | string) {
		this.port = port;
		this.app = express();
		this.Settings();
		this.Middleware();
		this.GlobalVariables();
		this.Routers();
	}

	private Settings(): void {
		this.app.set("port", this.port || process.env.PORT || 3000);
		this.app.set("views", path.join(__dirname, "Views"));
		this.app.engine(".hbs", exphbs({
			layoutsDir: path.join(this.app.get("views"), "Layouts"),
			partialsDir: path.join(this.app.get("views"), "Partials"),
			defaultLayout: "main",
			extname: ".hbs",
			helpers: require('./Helpers/handlebars')
		}));
		this.app.set('view engine', '.hbs');
	}

	private Middleware(): void {
		this.app.use(morgan("dev"));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
	}

	private GlobalVariables(): void {
		this.app.use((req: Request, res: Response, next: NextFunction) => {
			next();
		})
	}

	private Routers(): void {
		this.app.use(express.static(path.join(__dirname, 'Public')));
		this.app.use(rutas);
	}

	async Start() {
		await this.app.listen(this.app.get("port"));
		console.log(`Server on Port: ${this.app.get("port")}`);
	}
}