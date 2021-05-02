require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./models/db');
const Blog = require('./models/Blog');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find()
        res.send(blogs)
    } catch (error) {
        console.log(error.message)
    }
})

app.post('/addBlog', async (req, res) => {
    console.log(req.body.title, req.body.description)
    try {
        const newBlog = await new Blog({ title: req.body.title, description: req.body.description })
        await newBlog.save()
            .then((response) => {
                res.send(response)
            })
            .catch((err) => {
                console.log(err.message)
            })
    } catch (error) {
        console.log(error.message)
    }
})

app.get('/blog/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const findBlog = await Blog.findById(id)
            .then((response) => {
                res.send(response)
            })
            .catch((err) => {
                console.log(err.message)
            })
    } catch (error) {
        console.log(error.message)
    }
})

app.delete('/deleteBlog/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const deleteBlog = await Blog.findByIdAndRemove(id)
            .then((response) => {
                res.send(response)
            })
            .catch((err) => {
                console.log(err.message)
            })
    } catch (error) {
        console.log(error.message)
    }
})

app.put('/updateBlog/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const newValues = { $set : {title: req.body.title, description: req.body.description}}
        const updateBlog = await Blog.updateOne({_id: id}, newValues)
        .then((response) => {
            res.send(response)
        })
        .catch((err) => {
            console.log(err.message)
        })
    } catch (error) {
        console.log(error.message)
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
});