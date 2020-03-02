import mongoose from "mongoose";

async function connect() {
    try {
        //const url_connection = 'mongodb://jcastro:' + encodeURIComponent('Passw0rd!!') + '@localhost:27017/ts-app-tutorial?authSource=admin';
        const url_connection = "mongodb://localhost/ts-app-tutorial";
        await mongoose.connect(url_connection, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(">>> Database Connected");
    } catch (error) {
        console.log(error);
    }
}

export default connect;