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

// On page load, check if item is already in db to star already favorited items
app.get("/checkIfFavorite", (req, res) => {
  const { email, apiId, category } = req.query;
  db.query(
    `SELECT * 
    FROM users 
    JOIN ${category} ON users.id = ${category}.user_id 
    WHERE users.email = '${email}' AND ${category}.api_id = '${apiId}'`,
    (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).send({ error });
      }
      const isFavorite = result.rows.length > 0;
      return res.send({ isFavorite });
    }
  );
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

//-------------------------------------------------------------------------------------------
//INSERT FUNCTIONS

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
            insertIntoCrypto(userId, apiId, res);
            break;
          case "stocks":
            insertIntoStocks(userId, apiId, res);
            break;
          case "nft":
            insertIntoNft(userId, apiId, res);
            break;
          default:
            console.error(`Unrecognized api id category: ${apiId}`);
            break;
        }
      }
    );
  } 
});

const insertIntoCrypto = (userId, apiId, res) => {
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
          res.send({ status: "success" });
        }
      );
    }
  );
};

const insertIntoStocks = (userId, apiId, res) => {
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
          res.send({ status: "success" });

        }
      );
    }
  );
};

const insertIntoNft = (userId, apiId, res) => {
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
          res.send({ status: "success" });

        }
      );
    }
  );
};
//-------------------------------------------------------------------------------------------------------
// DELETING FUNCTIONS

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
            deleteFromCrypto(userId, apiId, res);
            break;
          case "stocks":
            deleteFromStocks(userId, apiId, res);
            break;
          case "nft":
            deleteFromNft(userId, apiId, res);
            break;
          default:
            console.error(`Unrecognized api id category: ${apiId}`);
            break;
        }
      }
    );
  } 
});

const deleteFromCrypto = (userId, apiId, res) => {
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


            db.query(`SELECT * FROM crypto WHERE user_id = ${userId}`, (error, result) => {
              if (error) {
                console.error(error);
                return;
              }
              console.log('DELETE FUNC RETURN', result.rows)
              res.send({rows: result.rows});
            });
          }
        );
      } else {
        console.log(`"${apiId}" not found in crypto table for user ${userId}`);
      }
    }
  );
};

const deleteFromStocks = (userId, apiId, res) => {
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

const deleteFromNft = (userId, apiId, res) => {
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

//-----------------------------------------------------------------------------------------
// POPULATE THE THREE WATCHLISTS

app.get("/getFavoritesCrypto", (req, res) => {
  const { email } = req.query;
  db.query(
    `SELECT * 
    FROM users 
    JOIN crypto ON users.id = crypto.user_id 
    WHERE users.email = '${email}'`,
    (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).send({ error });
      }
      console.log('result.rows', result.rows);
      return res.send({ favorites: result.rows });
    }
  );
});

app.get("/getFavoritesNFT", (req, res) => {
  const { email } = req.query;
  db.query(
    `SELECT * 
    FROM users 
    JOIN nft ON users.id = nft.user_id 
    WHERE users.email = '${email}'`,
    (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).send({ error });
      }
      return res.send({ favorites: result.rows });
    }
  );
});

app.get("/getFavoritesStocks", (req, res) => {
  const { email } = req.query;
  db.query(
    `SELECT * 
    FROM users 
    JOIN stocks ON users.id = stocks.user_id 
    WHERE users.email = '${email}'`,
    (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).send({ error });
      }
      return res.send({ favorites: result.rows });
    }
  );
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
