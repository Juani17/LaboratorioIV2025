const Books = require("../models/Books")

const getAllBooks = async (req, res) => {
    try {
        const books = await Books.find()
        if(!books){
           return res.status(404).json({message: "No se encontraron los libros en la base de datos"})
        }   
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({message: "Error al buscar los libros"})
    }
}

const getBookById = async (req, res) => {
    try {
        const books = await Books.findById(req.body.id)
        if(!books){
            return res.status(404).json({message: "No se encontraron los libros en la base de datos"})
        }   
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({message: "Error al buscar los libros"})
    }
}

const createBook = async (req, res) => {
    const book = new Books({
        titulo: req.body.titulo,
        resumen: req.body.resumen,
        genero: req.body.genero,
        publicacion: req.body.publicacion,
        disponible: req.body.disponible
    })

    try {
        const saveBooks = await book.save()
        res.status(201).json(saveBooks, {message: "Libro creado correctamente"})
        
    } catch (error) {
        res.status(500).json({message: "Error al crear Libro"})
    }
}

const updateBook = async (req, res) =>{
    try {
        const book = await Books.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!book){
            return res.status(404).json({message: "Libro no encontrado"})
        }
        res.status(201).json(book, {message: "Libro actualizado correctamente"})
    } catch (error) {
        res.status(500).json({message: "Error al actualizar el libro"})
    }
}

const deleteBook = async (req, res) => {
    try {
        const book = await Books.findById(req.body.id);
        if (!book) {
            return res.status(404).json({ message: "Libro no encontrado" });
        }

        const authorWithBook = await Author.findOne({ libros: req.body.id });
        if (authorWithBook) {
            return res.status(400).json({ message: "No se puede eliminar el libro porque está asignado a un autor" });
        }

        await book.remove();
        res.status(200).json({ message: "Libro eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar libro" });
    }
}


module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
}