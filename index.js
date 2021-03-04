const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

const dbname = 'bookdata'
const collectionname = 'books'
const url = 'mongodb+srv://superadmin:1234567890123@cluster0.bmxvn.mongodb.net/' + dbname + '?retryWrites=true&w=majority'
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })

let db, booksCollection

async function connect() {
    //Create connection to mongodb
    await client.connect()
    db = client.db(dbname)
    booksCollection = db.collection(collectionname)
}
connect()


const express = require('express')
const app = express()

app.use(express.json())

app.post('/books', async (req, res) => {
    // input
    let newTitle = req.body.title
    let newPrice = req.body.price
    let newUnit = req.body.unit
    let newIsbn = req.body.isbn
    let newImageUrl = req.body.imageUrl

    let newBook = { // key: value
        title: newTitle,
        price: newPrice,
        unit: newUnit,
        isbn: newIsbn,
        imageUrl: newImageUrl
    }

    let bookID = 0;
    // process
    const result = await booksCollection.insertOne(newBook)
    bookID = result.insertedId
    // output
    res.status(201).json(bookID)
})

const port = 3000;
app.listen(port, () => console.log(`Server started at ${port}`))

