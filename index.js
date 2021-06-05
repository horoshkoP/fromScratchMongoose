const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/tc-mongo-homework', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express()
const port = 4040

app.use(express.json())

const userRouter = require('./routes/user')
app.use('/users', userRouter)

const articleRouter = require('./routes/articles')
app.use('/articles', articleRouter)

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});
