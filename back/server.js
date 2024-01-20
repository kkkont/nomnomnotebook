const express = require('express');
const pool = require('./database');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));

app.use(express.json()); 
app.use(cookieParser()); 


app.listen(port, () => {
    console.log("Server is listening to port " + port)
});

app.post('/api/posts', async (req, res) => {
    try {
        console.log("a post request has arrived");
        const post = {
            title: req.body.title,
            body: req.body.body,
            urllink: req.body.urllink,
            date: req.body.date,
            author: req.body.author,
            likes: req.body.likes
        };
        const newPost = await pool.query(
            'INSERT INTO posttable(title,body,urllink, date, author,likes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [post.title, post.body, post.urllink, post.date, post.author, post.likes]
        );
        res.json(newPost);
    } catch (error) {
        console.error(error.message);
    }
});

app.get('/api/posts', async (req, res) => {
    try {
        console.log("get posts request has arrived");
        const posts = await pool.query(
            "SELECT * FROM posttable"
        );
        res.json(posts.rows);
    } catch (err) {
        console.error(err.message);
    }
});

