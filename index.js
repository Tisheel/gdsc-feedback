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
    await connectToMongoDB(MONGO_URL, 'Gdsc')

    //Empty Schema
    const feedbackSchema = new mongoose.Schema({}, { strict: false, timestamps: true })
    const Feedback = mongoose.model('Feedback', feedbackSchema)

    //APIs
    app.post('/api', async (req, res) => {
        try {
            const feedback = await Feedback(req.body)
            feedback.save()
            res.redirect('/thankyou')
        } catch (err) {
            res.send('Somthing went wrong.')
            console.log(err)
        }
    })

    app.get('/thankyou', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'thankyou.html'))
    })

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'public', '404.html'))
    })

    app.use('/', (req, res, next) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'))
    })

    app.listen(PORT, () => {
        console.log(`Server running on PORT:${PORT}`)
    })
})()