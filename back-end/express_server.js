const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const db = require("./db/connection.js");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello!");
});

//When NEW user logs in, they are added to local db (if not already in there)
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
      res.send({ status: "already exists" });
      return;
    }
    db.query(
      `INSERT INTO users(email) VALUES($1)`,
      [email],
      (error, result) => {
        if (error) {
          console.error(error);
          res.status(500).send(error);
          return;
        }
        console.log(`Inserted user with email ${email}`);
        res.send({ status: "success" });
      }
    );
  });
});

// Based on the category, it calls the appropriate insert function for that category. The insert
// functions for each table (insertIntoCrypto, insertIntoStocks, and insertIntoNft) are defined
// separately and are called from the request based on the category
app.post("/favoriteInsert", (req, res) => {
  if (req.body?.email) {
    const { email, apiId, category } = req.body;

    db.query(
      `SELECT id FROM users WHERE email = '${email}'`,
      (error, result) => {
        if (error) {
          console.error(error);
          return;
        }
        const userId = result.rows[0].id;
        switch (category) {
          case "crypto":
            insertIntoCrypto(userId, apiId);
            break;
          case "stocks":
            insertIntoStocks(userId, apiId);
            break;
          case "nft":
            insertIntoNft(userId, apiId);
            break;
          default:
            console.error(`Unrecognized api id category: ${apiId}`);
            break;
        }
      }
    );
  } 
});

// ** INSERT **  HELPER FUNCTIONS
const insertIntoCrypto = (userId, apiId) => {
  db.query(
    `SELECT * FROM crypto WHERE user_id = ${userId} AND api_id = '${apiId}'`,
    (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      if (result.rows.length > 0) {
        console.log(`"${apiId}" already exists in crypto table for user ${userId}`);
        return;
      }
      db.query(
        `INSERT INTO crypto (user_id, api_id) VALUES (${userId}, '${apiId}')`,
        (error, result) => {
          if (error) {
            console.error(error);
            return;
          }
          console.log(`Inserted "${apiId}" into crypto table`);
        }
      );
    }
  );
};

const insertIntoStocks = (userId, apiId) => {
  db.query(
    `SELECT * FROM stocks WHERE user_id = ${userId} AND api_id = '${apiId}'`,
    (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      if (result.rows.length > 0) {
        console.log(`"${apiId}" already exists in stocks table for user ${userId}`);
        return;
      }
      db.query(
        `INSERT INTO stocks (user_id, api_id) VALUES (${userId}, '${apiId}')`,
        (error, result) => {
          if (error) {
            console.error(error);
            return;
          }
          console.log(`Inserted "${apiId}" into stocks table`);
        }
      );
    }
  );
};

const insertIntoNft = (userId, apiId) => {
  db.query(
    `SELECT * FROM nft WHERE user_id = ${userId} AND api_id = '${apiId}'`,
    (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      if (result.rows.length > 0) {
        console.log(`"${apiId}" already exists in nft table for user ${userId}`);
        return;
      }
      db.query(
        `INSERT INTO nft (user_id, api_id) VALUES (${userId}, '${apiId}')`,
        (error, result) => {
          if (error) {
            console.error(error);
            return;
          }
          console.log(`Inserted "${apiId}" into nft table`);
        }
      );
    }
  );
};
//-------------------------------------------------------------------------------------------------------


app.post("/favoriteDelete", (req, res) => {
  if (req.body?.email) {
    const { email, apiId, category } = req.body;

    db.query(
      `SELECT id FROM users WHERE email = '${email}'`,
      (error, result) => {
        if (error) {
          console.error(error);
          return;
        }
        const userId = result.rows[0].id;
        switch (category) {
          case "crypto":
            deleteFromCrypto(userId, apiId);
            break;
          case "stocks":
            deleteFromStocks(userId, apiId);
            break;
          case "nft":
            deleteFromNft(userId, apiId);
            break;
          default:
            console.error(`Unrecognized api id category: ${apiId}`);
            break;
        }
      }
    );
  } 
});


// ** DELETE ** HELPER FUNCTIONS
const deleteFromCrypto = (userId, apiId) => {
  db.query(
    `SELECT * FROM crypto WHERE user_id = ${userId} AND api_id = '${apiId}'`,
    (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      if (result.rows.length > 0) {
        db.query(
          `DELETE FROM crypto WHERE user_id = ${userId} AND api_id = '${apiId}'`,
          (error, result) => {
            if (error) {
              console.error(error);
              return;
            }
            console.log(`Deleted "${apiId}" from crypto table for user ${userId}`);
          }
        );
      } else {
        console.log(`"${apiId}" not found in crypto table for user ${userId}`);
      }
    }
  );
};

const deleteFromStocks = (userId, apiId) => {
  db.query(
    `SELECT * FROM stocks WHERE user_id = ${userId} AND api_id = '${apiId}'`,
    (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      if (result.rows.length > 0) {
        db.query(
          `DELETE FROM stocks WHERE user_id = ${userId} AND api_id = '${apiId}'`,
          (error, result) => {
            if (error) {
              console.error(error);
              return;
            }
            console.log(`Deleted "${apiId}" from stocks table for user ${userId}`);
          }
        );
      } else {
        console.log(`"${apiId}" not found in stocks table for user ${userId}`);
      }
    }
  );
};

const deleteFromNft = (userId, apiId) => {
  db.query(
    `SELECT * FROM nft WHERE user_id = ${userId} AND api_id = '${apiId}'`,
    (error, result) => {
      if (error) {
        console.error(error);
        return;
      }
      if (result.rows.length > 0) {
        db.query(
          `DELETE FROM nft WHERE user_id = ${userId} AND api_id = '${apiId}'`,
          (error, result) => {
            if (error) {
              console.error(error);
              return;
            }
            console.log(`Deleted "${apiId}" from nft table for user ${userId}`);
          }
        );
      } else {
        console.log(`"${apiId}" not found in nft table for user ${userId}`);
      }
    }
  );
};




app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
