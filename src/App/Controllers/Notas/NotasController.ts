import { Request, Response } from 'express';
const Note = require("../../Models/Notas");

class NotasController {

    public async renderNotas(req: Request, res: Response) {
        const listNotes = await Note.find({ user: req.user}).sort({ date: "desc" });
        const js = 'Notes/notes.js';
        res.render('Views/Notas/All-Notes', { listNotes,js });
    }

    public renderOneNotas(req: Request, res: Response) {
        res.send('nota');
    }

    public renderNotasForms(req: Request, res: Response) {
        console.log('Usuario' + req.user);
        res.render('Views/Notas/NewNotes')
    }

    public async crearNewNatas(req: Request, res: Response) {
        const { titulo, descripcion } = req.body
        const newnotas = new Note({ titulo, descripcion })
        const nota = await newnotas.save();
        if (nota != []){
            req.flash('success_msg','Nota Creada Satisfactoriamente');
            res.redirect('/notes')
        }
        else res.redirect('/')
    }

    public async renderEditForms(req: Request, res: Response) {
        const { id } = req.params;
        const note = await Note.findById(id)
        res.render('Views/Notas/EditNotes', { note })
    }

    public async updateNatas(req: Request, res: Response) {
        const { id } = req.params;
        const { titulo, descripcion } = req.body;
        const nota = await Note.findByIdAndUpdate(id,{titulo,descripcion});
        if (nota != []){
            req.flash('success_msg','Nota Actualizada Satisfactoriamente');
            res.redirect('/notes')
        }
        else res.redirect('/')
    }

    public async deleteNatas(req: Request, res: Response) {
        const { id } = req.params;
        await Note.findByIdAndDelete(id);
        req.flash('success_msg','Nota Eliminada Satisfactoriamente');
        res.redirect('/notes');
    }

}

const notasController = new NotasController();
export default notasController;