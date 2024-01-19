const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "postgres", //add your password
    database: "nomnomnotebook",
    host: "localhost",
    port: "5432"
});

const execute = async(query, query1) => {
    try {
        await pool.connect(); // create a connection
        await pool.query(query);
        await pool.query(query1); // executes a query
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
    CREATE TABLE IF NOT EXISTS "recipetable" (
	    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),         
	    "title" VARCHAR(200) NOT NULL,
	    "body" VARCHAR(200) NOT NULL,
        "urllink" VARCHAR(200), 
        "date" VARCHAR(200) NOT NULL,
        "author" VARCHAR(200) NOT NULL,
        "likes" INT,
    );`;

    const createTblQuery2 = `
    CREATE TABLE IF NOT EXISTS "recipecommenttable" (
	    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),         
	    "body" VARCHAR(200) NOT NULL,
        "date" VARCHAR(200) NOT NULL,
        "author" VARCHAR(200) NOT NULL,
        "likes" INT,
    );`;

execute(createTblQuery,createTblQuery1).then(result => {
    if (result) {
        console.log('Tables "users", "recipetable" and "recipecommenttable" is created');
    }
});

module.exports = pool;