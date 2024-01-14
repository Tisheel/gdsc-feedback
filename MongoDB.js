const mongoose = require('mongoose')

const connectToMongoDB = async (URL, dbName) => {
    try {
        const res = await mongoose.connect(URL, {
            dbName
        })
        console.log(`MongoDB Connected Successfully [${dbName}]`)
    } catch (error) {
        console.log(`Cannot connect To Database`)
        console.log(error)
    }
}

module.exports = connectToMongoDB