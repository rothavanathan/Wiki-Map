/*
 * All routes for Maps are defined here
 * Since this file is loaded in server.js into api/maps,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
// const displayLoginForm = require('../public/scripts/login_form.js');
const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  //show list of all maps
  router.get("/", (req, res) => {
    let query = `
    SELECT * FROM maps
    JOIN users ON users.id = owner_id
    `;
    console.log(query);
    return db.query(query)
      .then(data => {
        const maps = data.rows;
        res.json({ maps });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //show list of favourite maps for specific user
  router.get("/fave", (req, res) => {
    //if no user cookie
    if (!req.session.userId) {
      res.sendStatus(401).send(`401 - Please login for`);
    }
    let query = `
    SELECT * FROM maps
    JOIN map_permissions ON maps.id = map_permissions.map_id
    JOIN users ON map_permissions.user_id = users.id
    WHERE map_permissions.isFavorite = true
    AND users.id = $1
    `;
    //db query should use cookies for user id
    db.query(query, [req.session.userId])
      .then(data => {
        maps = data.rows;
        res.json({ maps });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    });

  //load specific map
  router.get("/:id", (req, res) => {
    let query = `
    SELECT * FROM maps
    JOIN markers ON maps.id = markers.map_id
    WHERE markers.map_id = $1
    `;
    db.query(query, [req.params.id])
      .then(data => {
        maps = data.rows;
        res.json({ maps });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });



  return router;
};
