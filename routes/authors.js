const Express = require("express")
const router = Express.Router()

const {
    getAllAuthors,
    getAuthorById,
    creatAuthor,
    updateAuthor,
    deleteAuthor,
    addBookAtAuthor,
} = require("../controllers/authorController")

router.get("/", getAllAuthors)
router.get("/:id", getAuthorById)
router.post("/", creatAuthor)
router.put("/:id", updateAuthor)
router.delete("/:id", deleteAuthor)
router.put("/:id/addBook/:bookId", addBookAtAuthor)

module.exports = router;
