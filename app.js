const mongoose = require("mongoose")
const Express = require("express")
const dotenv = require("dotenv")

dotenv.config();

const app = Express();
const PORT = process.env.PORT || 3007;

app.use(Express.json());

const booksRoutes = require("./routes/books")
const authorRoutes = require("./routes/authors")

app.use("/api/books", booksRoutes)
app.use("/api/authors", authorRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(() => {   
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => {
        console.log(`servidor corriendo en: ${PORT}`);
    });
})
.catch(err => {
    console.error('Error al conectar con MongoDB:', err);
});