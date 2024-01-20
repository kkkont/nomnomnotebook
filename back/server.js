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

app.post('/api/recipes', async (req, res) => {
    try {
        console.log("Add a recipe request has arrived");
        const recipe = {
            title: req.body.title,
            body: req.body.body,
            urllink: req.body.urllink,
            date: req.body.date,
            author: req.body.author,
            likes: req.body.likes
        };
        const newRecipe = await pool.query(
            'INSERT INTO recipestable(title,body,urllink, date, author,likes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [recipe.title, recipe.body, recipe.urllink, recipe.date, recipe.author, recipe.likes]
        );
        res.json(newRecipe);
    } catch (error) {
        console.error(error.message);
    }
});

app.get('/api/recipes', async (req, res) => {
    try {
        console.log("Get all recipes request has arrived");
        const recipes = await pool.query(
            "SELECT * FROM recipestable"
        );
        res.json(recipes.rows);
    } catch (err) {
        console.error(err.message);
    }
});

