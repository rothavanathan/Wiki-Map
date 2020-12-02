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

    `;
    console.log(query);
    return db.query(query)
      .then(mapD => {
        const maps = mapD.rows;
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
      .then(mapD => {
        maps = mapD.rows;
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
      .then(mapD => {
        maps = mapD.rows;
        res.json({ maps });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/save", (req, res) => {
    console.log("this happened")
    const owner_id = req.session.userId;
    console.log("owner_id", owner_id)
    console.log("this is req.body", req.body)
    const mapData = req.body;
    console.log(mapData)
    // res.send(mapFormData)
    const query1 = `
    INSERT INTO maps (owner_id, title, description, thumbnail_photo_url, thumbnail_alt_text, isPublic)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id
    `;

    const params1 = [owner_id, mapData.title, mapData.description, mapData.thumbnail_photo_url, mapData.thumbnail_alt_text, mapData.isPublic];
    db.query(query1, params1)
    .then(data => {
      map_id = data.rows[0]
      // console.log(mapD.rows)
      res.send(map_id)
      // map_id = data.rows[0].id
      // const params = [mapData.user_id, map_id, true];
    })
    .catch(err => {
      console.log(err)
    });

  })


  return router;
};

// const query2 = `
//     INSERT INTO map_permissions (user_id, map_id, isAuthenticated)
//     VALUES ($1, $2, $3)
//     RETURNING id
//     `;
