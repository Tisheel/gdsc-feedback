const express = require('express')
const path = require('path')

const app = express()
const PORT = 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.post('/api', (req, res) => {
    console.log(req.body)
    res.redirect('/')
})


app.use('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server running on PORT:${PORT}`)
})