/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { response } = require('express');
const bcrypt = require('bcrypt');
const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  //display all users from database
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });




  //function to check if user email is in database
  const isEmailRegistered = (email, database) => {
    return database
    .query(`
      SELECT * FROM users
      WHERE users.email = $1`, [email])
    .then(res => {
      if (res.rows.length > 0) {
        return Promise.reject(`Regstration failed: email already taken`)
      } else {
        return Promise.resolve(`Continue Registration: email isn't taken`);
      }
    }).catch(err => (console.log(err)))
  };

   //function to check if user handle is in database
   const isHandleRegistered = (handle, database) => {
    return database
    .query(`
      SELECT * FROM users
      WHERE users.handle = $1`, [handle])
    .then(res => {
      if (res.rows.length > 0) {
        return Promise.reject(`Regstration failed: handle already taken`)
      } else {
        return Promise.resolve(`Continue Registration: handle isn't taken`);
      }
    }).catch(err => (console.log(err)))
  };

  const getUserWithEmail = (email, database) => {
    return database
    .query(`
      SELECT * FROM users
      WHERE users.email = $1`, [email])
    .then(res => {
      return res.rows.length > 0 ? Promise.resolve(res.rows[0]) : Promise.reject(`no user with that email`);
    })
  };

  const login = (email, passwordInput, database) => {
    return getUserWithEmail(email, database)
    .then(user => {
      if (bcrypt.compareSync(passwordInput, user.password)) {
        return Promise.resolve(user);
      } else {
        return Promise.reject(null);
      }
    })
  };

  //add create/register user route
  router.post('/', (req, res) => {
    const {handle, email, password, avatar} = req.body;
    //check if email is already taken by another user
    isEmailRegistered(email, db)
      .then(emailExists => {
        if (!emailExists) {
          res.status(403).send(`email already taken`).end();
          return
        }
        //check if handle is already taken by another user
        isHandleRegistered(handle, db)
          .then(handleExists => {
            if (!handleExists) {
              res.status(403).send(`handle already taken`).end();
              return
            }
          //validation complete hash password and sanitize inputs
            const hashedPassword = bcrypt.hashSync(password, 12);
            return db
          .query(`
            INSERT INTO users (handle, email, password, avatar_url)
            VALUES ($1, $2, $3, $4)
            RETURNING *
            `, [handle, email, hashedPassword, avatar])
          .then(queryResult => {
            //extra check in case nothing is returned from database
            if (!queryResult) {
              res.send({error: "error"});
              return;
            }

            req.session.userId = queryResult.rows[0].id;
            res.send(queryResult.rows[0])
          }).catch(err => {
            console.log(err)
            res.sendStatus(500)});
          });
      })


  });



  //post login request
  router.post("/login", (req, res) => {
    const {email, password} = req.body;

    return login(email, password, db)
      .then(user => {
        if (!user) {
          throw Error;
          return;
        }
        console.log(`user returned from login:`, user)
        req.session.userId = user.id;
        res.send({user: {name: user.name, email: user.email, id: user.id}});
      }).catch(err => {
        res.sendStatus(401)
      });
  })

  router.get("/logout", (req, res) => {
    req.session = null;
    console.log(`logout post route!`);
    res.send(`logout route`)
  })

  return router;
}
