import mongoose from "mongoose";

export class MongoDB {

    constructor() { }

    public async connect() {
        try {
            const { NOTE_APP_MONGODB_HOST, NOTE_APP_MONGODB_DATABASE } = process.env

            const url_connection = `mongodb://${NOTE_APP_MONGODB_HOST}/${NOTE_APP_MONGODB_DATABASE}`;
            await mongoose.connect(url_connection, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });
            console.log(">>> Base de Datos Conectada <<<");
        } catch (error) {
            console.log(error);
        }
    }

}