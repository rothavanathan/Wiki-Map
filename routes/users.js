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

  //add create nad register user route
  router.post('/', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 12);
    // database.addUser(user)
    // .then(user => {
    //   if (!user) {
    //     res.send({error: "error"});
    //     return;
    //   }
    //   req.session.userId = user.id;
    //   res.send("🤗");
    // })
    // .catch(e => res.send(e));
  });



  //function to check if user is in database
  const isEmailRegistered = (email, database) => {
    return database
    .query(`
      SELECT * FROM users
      WHERE email = $1`, [email])
    .then(res => {
      if (res.rows.length > 0) {
        return true
      } else {
        return false;
      }
    })
    .catch(err => console.log(err))
  };

  const getUserWithEmail = (email, database) => {
    return database
    .query(`
      SELECT * FROM users
      WHERE users.email = $1`, [email])
    .then(res => {
      return res.rows[0];
    })
    .catch(err => console.log(err))
  };

  const login = (email, passwordInput, database) => {
    return getUserWithEmail(email, database)
    .then(user => {
      if (bcrypt.compareSync(passwordInput, user.password)) {
        return user;
      } else {
        return null;
      }
    })
    .catch(err => console.log(`something wrong with login function: `, err))
  };


  //post login request
  router.post("/login", (req, res) => {
    const {email, password} = req.body;

    login(email, password, db)
      .then(user => {
        console.log(`user returned from login:`, user)
        if (!user) {
          res.send({error: "error"});
          return;
        }
        req.session.userId = user.id;
        res.send({user: {name: user.name, email: user.email, id: user.id}});
      })
      .catch(err => console.log(err))
  })

  return router;
};
