import { Schema, model, Document } from "mongoose";

const NoteSchema = new Schema({
    titulo: { type: String, required: true, uppercase: true },
    descripcion: { type: String, required: true, uppercase: true },
}, { timestamps: true });

module.exports = model("Note", NoteSchema);