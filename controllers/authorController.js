const Author = require("../models/Author")

const getAllAuthors = async (req, res) => {
    try {
        const author = await Author.find().populate("libros")
        if(!author){
           return res.status(404).json({message: "No se encontraron los autores en la base de datos"})
        }   
        res.status(200).json(author)
    } catch (error) {
        res.status(500).json({message: "Error al buscar autores"})
    }
}

const getAuthorById = async (req, res) => {
    try {
        const author = await Author.findById(req.body.id).populate("libros")
        if(!author){
            return res.status(404).json({message: "No se encontraron el autor en la base de datos"})
        }   
        res.status(200).json(author)
    } catch (error) {
        res.status(500).json({message: "Error al buscar los autores"})
    }
}

const creatAuthor = async (req, res) => {
    const author = new Author({
        nombre: req.body.nombre,
        bio: req.body.bio,
        fechaNacimiento: req.body.fechaNacimiento,
        nacionalidad: req.body.nacionalidad,
        libros: req.body.libros
    })

    try {
        const saveAuthor = await author.save()
        res.status(201).json(saveAuthor, {message: "Autor creado correctamente"})
        
    } catch (error) {
        res.status(500).json({message: "Error al crear Autor"})
    }
}

const updateAuthor = async (req, res) =>{
    try {
        const author = await Author.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!author){
            return res.status(404).json({message: "Autor no encontrado"})
        }
        res.status(201).json(book, {message: "Autor actualizado correctamente"})
    } catch (error) {
        res.status(500).json({message: "Error al actualizar el Autor"})
    }
}

const deleteAuthor= async (req, res) =>{
    try {
        const author = await Author.findByIdAndDelete(req.body.id)
        if(!author){
            return res.status(404).json({message: "Autor no encontrado"})
        }
        res.status(200).json({message: "Autor eliminado correctamente"})
    } catch (error) {
        res.status(500).json({message: "Error al eliminar Autor"})
    }
}

const addBookAtAuthor = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) {
            return res.status(404).json({ message: 'Autor no encontrado' });
        }

        const book = await Book.findById(req.body.booksId);
        if (!book) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }

        if (author.libros.includes(req.body.booksId)) {
            return res.status(400).json({ message: 'El libro ya está asignado al autor' });
        }

        author.libros.push(req.body.booksId);
        await author.save();
        res.status(202).json(author);
    } catch (error) {
        res.status(500).json({ message: "Error al agregar libro" });
    }
}


module.exports = {
    getAllAuthors,
    getAuthorById,
    creatAuthor,
    updateAuthor,
    deleteAuthor,
    addBookAtAuthor,
}