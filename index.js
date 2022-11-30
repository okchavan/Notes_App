import express from "express"
import cors from "cors"
import mongoose from "mongoose"


const app = express()
app.use(express.urlencoded())
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/mynoteAppDB", { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("DB Connect"))

const noteSchema = mongoose.Schema({
    title: String,
    description: String


})

const Note = new mongoose.model("Note", noteSchema)


app.get("/api/getAll", (req, res) => {
    Note.find({}, (err, noteList) => {
        if (err) {
            console.log(err)
        } else {
            res.status(200).send(noteList)
        }
    })
})

app.post("/api/addNew", (req, res) => {
    const { title, description } = req.body
    const noteObj = new Note({
        title,
        description
    })

    console.log(noteObj)
    noteObj.save(err => {
        if (err) {
            console.log(err)

        }
        Note.find({}, (err, noteList) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).send(noteList)
            }
        })
    })
})

app.post("/api/delete", (req, res) => {
    const { id } = req.body
    Note.deleteOne({ _id: id }, () => {
        Note.find({}, (err, noteList) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).send(noteList)
            }
        })
    })
})



app.listen(3001, () => {
    console.log("Database Created At 3001")
})
