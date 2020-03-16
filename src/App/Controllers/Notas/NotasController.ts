import { Request, Response } from 'express';
const Note = require("../../Models/Notas");

class NotasController {

    public async renderNotas(req: Request, res: Response) {
        const listNotes = await Note.find()
        res.render('Views/Notas/All-Notes', { listNotes });
    }

    public renderOneNotas(req: Request, res: Response) {
        res.send('nota');
    }

    public renderNotasForms(req: Request, res: Response) {
        res.render('Views/Notas/NewNotes')
    }

    public async crearNewNatas(req: Request, res: Response) {
        const { titulo, descripcion } = req.body
        const newnotas = new Note({ titulo, descripcion })
        const nota = await newnotas.save();
        if (nota != [])
            res.redirect('/notes')
        else res.redirect('/')
    }

    public async renderEditForms(req: Request, res: Response) {
        const { id } = req.params;
        const note = await Note.findById(id)
        res.render('Views/Notas/EditNotes', { note })
    }

    public updateNatas(req: Request, res: Response) {
        res.send('Notas Edit');
    }

    public async deleteNatas(req: Request, res: Response) {
        const { id } = req.params;
        await Note.findByIdAndDelete(id);
        res.redirect('/notes');
    }

}

const notasController = new NotasController();
export default notasController;