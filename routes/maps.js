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
  //show list of all maps
  router.get("/public", (req, res) => {
    //if we don't have cookies
    if (!req.session.userId) {
      let query = `
      SELECT maps.id, owner_id, title, description, thumbnail_photo_url, thumbnail_alt_text, isPublic, users.handle as owner_handle , users.avatar_url FROM maps
      JOIN users ON maps.owner_id = users.id
      WHERE maps.isPublic = true
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
    //we do have cookies
    } else {
      let query = `
      SELECT maps.id, owner_id, title, description, thumbnail_photo_url, thumbnail_alt_text, isPublic, users.handle as owner_handle , users.avatar_url, map_permissions.isFavorite, map_permissions.isAuthenticated, map_permissions.isContributor FROM maps
      JOIN users ON maps.owner_id = users.id
      JOIN map_permissions ON map_permissions.map_id = maps.id
      WHERE maps.isPublic = true
      GROUP BY maps.id, users.handle, map_permissions.isFavorite, users.avatar_url, map_permissions.isAuthenticated, map_permissions.isContributor
      `;

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



    }

  });

  //show list of favourite maps for specific user
  router.get("/fave", (req, res) => {
    //if no user cookie
    if (!req.session.userId) {
      res.sendStatus(401).send(`401 - Please login for fave maps`);
    }
    let query = `
    SELECT maps.id, maps.owner_id, title, description, thumbnail_photo_url, thumbnail_alt_text, isPublic, A.handle, A.avatar_url, map_permissions.user_id, map_permissions.map_id, map_permissions.isFavorite, map_permissions.isAuthenticated, map_permissions.isContributor, B.handle as owner_handle FROM maps
    JOIN map_permissions ON maps.id = map_permissions.map_id
    JOIN users A ON map_permissions.user_id = A.id
    JOIN users B ON maps.owner_id = B.id
    WHERE map_permissions.isFavorite = true
    AND map_permissions.user_id = $1
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
