const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const db = require('./db/connection.js');
const cors = require('cors');
const bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello!");
});

//When NEW user logs in, they are added to local db
app.post("/users", (req, res) => {
  const email = req.body.email;
  db.query(`SELECT * FROM users WHERE email = $1`, [email], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).send(error);
      return;
    }
    if (result.rows.length > 0) {
      console.log(`User with email ${email} already exists.`);
      res.send({ status: 'already exists' });
      return;
    }
    db.query(`INSERT INTO users(email) VALUES($1)`, [email], (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send(error);
        return;
      }
      console.log(`Inserted user with email ${email}`);
      res.send({ status: 'success' });
    });
  });
});






// The insertData function calls the getCategory function to determine the category of the apiId. 
// Based on the category, it calls the appropriate insert function for that category. The insert 
// functions for each table (insertIntoCrypto, insertIntoStocks, and insertIntoForex) are defined 
// separately and are called from the insertData function based on the category
const insertData = (email, apiId) => {
  pool.query(`SELECT id FROM users WHERE email = '${email}'`, (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    const userId = result.rows[0].id;
    switch (getCategory(apiId)) {
      case 'crypto':
        insertIntoCrypto(userId, apiId);
        break;
      case 'stocks':
        insertIntoStocks(userId, apiId);
        break;
      case 'forex':
        insertIntoNft(userId, apiId);
        break;
      default:
        console.error(`Unrecognized api id category: ${apiId}`);
        break;
    }
  });
};

const insertIntoCrypto = (userId, apiId) => {
  db.query(`INSERT INTO crypto (user_id, api_id) VALUES (${userId}, '${apiId}')`, (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(`Inserted data into crypto table`);
  });
};

const insertIntoStocks = (userId, apiId) => {
  db.query(`INSERT INTO stocks (user_id, api_id) VALUES (${userId}, '${apiId}')`, (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(`Inserted data into stocks table`);
  });
};

const insertIntoNft = (userId, apiId) => {
  db.query(`INSERT INTO nft (user_id, api_id) VALUES (${userId}, '${apiId}')`, (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(`Inserted data into nft table`);
  });
};

const getCategory = (apiId) => {
  // Implement logic to determine the category of the apiId
  // ...
  return category;
};

document.getElementById("submit-button").addEventListener("click", function () {
  const email = document.getElementById("email").value;
  const apiId = document.getElementById("api-id").value;
  insertData(email, apiId);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});