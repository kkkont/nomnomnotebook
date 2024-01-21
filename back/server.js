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

const secret = "gdgdhdbcb770785rgdzqws"; 
const maxAge = 60 * 60;

let activeUserId;

const generateJWT = (id) => {
    activeUserId = id;
    console.log("Active user id "+ activeUserId)
    return jwt.sign({ id }, secret, { expiresIn: maxAge })
}

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});


app.get('/auth/authenticate', async (req, res) => {
    console.log('Authentication request has been arrived');
    const token = req.cookies.jwt; 
    let authenticated = false; 
    try {
        if (token) { 
            await jwt.verify(token, secret, (err) => { 
                if (err) { 
                    console.log(err.message);
                    console.log('token is not verified');
                    res.send({ "authenticated": authenticated });
                } else { 
                    console.log('User is authinticated');
                    authenticated = true;
                    res.send({ "authenticated": authenticated }); 
                }
            })
        } else {
            console.log('User is not authinticated');
            res.send({ "authenticated": authenticated }); 
        }
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});


app.post('/auth/signup', async (req, res) => {
    try {
        console.log("A signup request has arrived");
        const { email, password, name, urllink, description } = req.body;
        const salt = await bcrypt.genSalt(); 
        const bcryptPassword = await bcrypt.hash(password, salt) 
        const authUser = await pool.query( 
            "INSERT INTO users(email, password, name, urllink, description) values ($1, $2, $3, $4, $5) RETURNING*", [email, bcryptPassword, name ,urllink, description]
        );
        console.log(authUser.rows[0].id);
        const token = await generateJWT(authUser.rows[0].id);
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: authUser.rows[0].id })
            .send;
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

app.post('/auth/login', async (req, res) => {
    try {
        console.log("a login request has arrived");
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) return res.status(401).json({ error: "User is not registered" });
        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) return res.status(401).json({ error: "Incorrect password" });

        const token = await generateJWT(user.rows[0].id);
        res
            .status(201)
            .cookie('jwt', token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: user.rows[0].id })
            .send;
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

app.get('/auth/logout', (req, res) => {
    console.log('delete jwt request arrived');
    res.status(202).clearCookie('jwt').json({ "Msg": "cookie cleared" }).send
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
            authorimg: req.body.authorimg,
            authorid:req.body.authorid,
            likes: req.body.likes,
            comments:req.body.comments,
            public:req.body.public
        };
        const newRecipe = await pool.query(
            'INSERT INTO recipestable(title,body,urllink, date, author, authorimg,authorid,likes,comments,public) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
            [recipe.title, recipe.body, recipe.urllink, recipe.date, recipe.author,recipe.authorimg,recipe.authorid, recipe.likes, recipe.comments,recipe.public]
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
            "SELECT * FROM recipestable WHERE public = true"
        );
        res.json(recipes.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/api/users', async (req, res) => {
    try {
        console.log("Get active user details request has arrived");
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [activeUserId]);
        if (user.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        console.log("User found")
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



