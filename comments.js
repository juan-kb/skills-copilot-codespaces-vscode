// Create web server
// Create a new instance of express
const express = require('express')
const app = express()
// Create a new instance of body-parser
const bodyParser = require('body-parser')
// Create a new instance of mongoose
const mongoose = require('mongoose')
// Connect to MongoDB
mongoose.connect('mongodb://localhost/comments')
// Create a new instance of the comment model
const Comment = require('./models/comment')

// Use body-parser to parse JSON
app.use(bodyParser.json())

// Create a new comment
app.post('/comments', (req, res) => {
  const comment = new Comment(req.body)
  comment.save((err, comment) => {
    if (err) res.status(500).send(err)
    res.status(201).json(comment)
  })
})

// Get all comments
app.get('/comments', (req, res) => {
  Comment.find((err, comments) => {
    if (err) res.status(500).send(err)
    res.status(200).json(comments)
  })
})

// Get a single comment by id
app.get('/comments/:id', (req, res) => {
  Comment.findById(req.params.id, (err, comment) => {
    if (err) res.status(500).send(err)
    res.status(200).json(comment)
  })
})

// Update a single comment by id
app.put('/comments/:id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, comment) => {
    if (err) res.status(500).send(err)
    res.status(200).json(comment)
  })
})

// Delete a single comment by id
app.delete('/comments/:id', (req, res) => {
  Comment.findByIdAndRemove(req.params.id, (err, comment) => {
    if (err) res.status(500).send(err)
    res.status(200).json(comment)
  })
})

// Start the web server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
}) 
