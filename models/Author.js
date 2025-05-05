const mongoose = require ("mongoose")

const authorSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    bio: {
        type: String,
    },
    fechaNacimiento:{
        type: Date,
        require: true
    },
    nacionalidad:{
        type: String,
        require: true
    },
    libros:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Books'
    }]
})

module.exports = mongoose.model('Author', authorSchema);