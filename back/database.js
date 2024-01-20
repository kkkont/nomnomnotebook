const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "postgres", //add your password
    database: "nomnomnotebook",
    host: "localhost",
    port: "5432"
});

const execute = async(query, query1,query2, query3) => {
    try {
        await pool.connect(); // create a connection
        await pool.query(query);
        await pool.query(query1); // executes a query
        await pool.query(query2);
        await pool.query(query3);
        return true;
    } catch (error) {
        console.error(error.stack);
        return false;
    }
};

const createTblQuery = `
    CREATE TABLE IF NOT EXISTS "users" (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(200) NOT NULL UNIQUE,
        password VARCHAR(200) NOT NULL 
    );`;

const createTblQuery1 = `
    CREATE TABLE IF NOT EXISTS "recipestable" (
	    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),         
	    "title" VARCHAR(200) NOT NULL,
	    "body" VARCHAR(200) NOT NULL,
        "urllink" VARCHAR(200), 
        "date" VARCHAR(200) NOT NULL,
        "author" VARCHAR(200) NOT NULL,
        "likes" INT
    );`;

    const createTblQuery2 = `
    CREATE TABLE IF NOT EXISTS "recipecommenttable" (
	    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),         
	    "body" VARCHAR(200) NOT NULL,
        "urllink" VARCHAR(200), 
        "date" VARCHAR(200) NOT NULL,
        "author" VARCHAR(200) NOT NULL,
        "likes" INT
    );`;

    const createRecipeQuery = `
    INSERT INTO recipestable(title, body, urllink, date, author, likes)
    VALUES ('Esimene retsept', 'Muna ja sool', '', '26-04-2024', 'Kadri', 6)
    RETURNING *`;


execute(createTblQuery, createTblQuery1, createTblQuery2, createRecipeQuery).then(result => {
    if (result) {
        console.log('Tables "users", "recipestable", and "recipecommenttable" are created');
    }
});

module.exports = pool;