import { Schema, model } from "mongoose";
import { hash, genSalt, compare } from "bcryptjs";


const UserSchema = new Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });


//Funcion Para Sifrar la Contraseña
UserSchema.methods.encrypPassword = async (pw: string) => {
    const salt = await genSalt(10);
    return await hash(pw, salt);
}

//Funcion Para comparar Las Contraseñas
UserSchema.methods.matchPassword = async function (pw: string) {
    return await compare(pw, this.password);
}


module.exports = model('User', UserSchema)