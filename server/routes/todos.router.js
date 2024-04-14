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
  
    const todo = req.body.item;
 
    // Need to send a 'INSERT INTO songs' SQL query
    // to our database, containing the data from
    // req.body:
    const sqlText = `
      INSERT INTO koalas
        (name, age, favorite_color, ready_to_transfer, notes)
        VALUES
        ($1, $2, $3, $4, $5);
    `
    const sqlValues = [name, age, color, transferReady, notes];
  
    console.log('SQL values',sqlValues);

    // Use le pool to send this SQL query to our database:
    pool.query(sqlText, sqlValues)
      .then((dbRes) => {
        // if pool query worked it will do .then on client side
        res.sendStatus(201);  //bc it worked we are sendign ok created to the cleint 
      })
      .catch((dbErr) => {
        console.log('Failsauce in POST /koalas', dbErr);
        res.sendStatus(500);
      })
  });




module.exports = router;
