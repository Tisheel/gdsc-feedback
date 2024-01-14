require('dotenv').config()
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const connectToMongoDB = require('./MongoDB')

const app = express()
const PORT = process.env.PORT || 3001
const MONGO_URL = process.env.MONGO_URL;

(async () => {
    //Middlewares
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static(path.join(__dirname, 'public')))

    //Connect To Mongo
    await connectToMongoDB(MONGO_URL, 'Gdsc_feedback')

    //APIs
    app.post('/api', (req, res) => {
        try {

        } catch (err) {
            console.log(err)
        }
    })

    app.use('/', (req, res, next) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'))
    })

    app.listen(PORT, () => {
        console.log(`Server running on PORT:${PORT}`)
    })
})()