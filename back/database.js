const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "postgres", //add your password
    database: "nomnomnotebook",
    host: "localhost",
    port: "5432"
});

const execute = async(query, query1,query2) => {
    try {
        await pool.connect(); // create a connection
        await pool.query(query);
        await pool.query(query1); // executes a query
        await pool.query(query2);
    
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
        password VARCHAR(200) NOT NULL,
        name VARCHAR(200) NOT NULL,
        description VARCHAR(200),
        urllink VARCHAR(500)
    );`;

const createTblQuery1 = `
    CREATE TABLE IF NOT EXISTS "recipestable" (
	    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),         
	    "title" VARCHAR(200) NOT NULL,
	    "body" VARCHAR(200) NOT NULL,
        "urllink" VARCHAR(200), 
        "date" VARCHAR(200) NOT NULL,
        "authorid" uuid,
        "likes" INT,
        "comments" INT,
        "public" BOOLEAN
    );`;

    const createTblQuery2 = `
    CREATE TABLE IF NOT EXISTS "recipecommenttable" (
	    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "recipe_id" uuid NOT NULL,         
	    "body" VARCHAR(200) NOT NULL,
        "urllink" VARCHAR(200), 
        "date" VARCHAR(200) NOT NULL,
        "author" VARCHAR(200) NOT NULL,
        "authorid" uuid,
        "likes" INT
    );`;

  

execute(createTblQuery, createTblQuery1, createTblQuery2).then(result => {
    if (result) {
        console.log('Tables "users", "recipestable", and "recipecommenttable" are created');
    }
});

module.exports = pool;