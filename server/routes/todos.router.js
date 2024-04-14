const router = require('express').Router();
//
const pool = require('../modules/pool');

// GET

router.get('/', (req, res) => {
    console.log('GET /todos!');
    // Here's the SQL query I need to send to the db:
    const sqlText = `
      SELECT * FROM todos
        ORDER BY id;
    `
    // Use our pool object to query thee db:
    pool.query(sqlText)
      .then((dbResult) => {
        let toDOsRequested = dbResult.rows;
        res.send(toDOsRequested);
      })
      .catch((dbError) => {
        console.log('DB query failed inside GET /koalas!');
        console.log('Error is:', dbError);
        res.sendStatus(500);
      })
  
  });


// post 

router.post('/', (req, res) => {
    console.log('req.body', req.body);
  
 const text = req.body.item;
console.log(text);
 
    // Need to send a 'INSERT INTO songs' SQL query
    // to our database, containing the data from
    // req.body:
                                const sqlText = `
                                INSERT INTO "todos"
                                ("text")
                                VALUES 
                                ($1);
                                `
                                const sqlValues = [text];
                            
                                console.log('SQL todo values',sqlValues);

                                // // Use le pool to send this SQL query to our database:
                                pool.query(sqlText, sqlValues)
      .then((dbRes) => {
        // if pool query worked it will do .then on client side
        res.sendStatus(201);  //bc it worked we are sendign ok created to the cleint 
      })
      .catch((dbErr) => {
        console.log('Failsauce in POST /ToDos', dbErr);
        res.sendStatus(500);
      })
  });




module.exports = router;
