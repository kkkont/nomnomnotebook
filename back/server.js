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

app.put('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name,urllink, description} = req.body;
        const updatedUser = await pool.query(
            'UPDATE users SET name = $1,urllink = $2, description = $3 WHERE id = $4 RETURNING *',
            [name,urllink, description, id]
        );

        res.json(updatedUser.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

        if (post.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(post.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.post('/api/recipes', async (req, res) => {
    try {
        console.log("Add a recipe request has arrived");
        const recipe = {
            title: req.body.title,
            body: req.body.body,
            urllink: req.body.urllink,
            date: req.body.date,
            authorid:req.body.authorid,
            likes: req.body.likes,
            comments:req.body.comments,
            public:req.body.public
        };
        const newRecipe = await pool.query(
            'INSERT INTO recipestable(title,body,urllink, date,authorid,likes,comments,public) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [recipe.title, recipe.body, recipe.urllink, recipe.date, recipe.authorid, recipe.likes, recipe.comments,recipe.public]
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

app.get('/api/myrecipes', async (req, res) => {
    try {
        console.log("Get active user recipe request has arrived");
        const recipes = await pool.query(
            "SELECT * FROM recipestable WHERE authorid = $1", [activeUserId]);
        res.json(recipes.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/api/recipes/:id', async (req, res) => {
    try {
        console.log("get single recipe request has arrived");
       
        const { id } = req.params;
        const post = await pool.query("SELECT * FROM recipestable WHERE id = $1", [id]);

        if (post.rows.length === 0) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        res.json(post.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/api/recipes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`delete recipe with id ${id} request has arrived`);

        await pool.query('DELETE FROM recipestable WHERE id = $1', [id]);

        res.json({ message: `Recipe with id ${id} deleted successfully` });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/api/recipes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, body, urllink,public} = req.body;

        const updatedRecipe = await pool.query(
            'UPDATE recipestable SET title = $1, body = $2, urllink = $3, public = $4 WHERE id = $5 RETURNING *',
            [title, body, urllink, public, id]
        );

        res.json(updatedRecipe.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
