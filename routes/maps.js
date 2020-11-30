/*
 * All routes for Maps are defined here
 * Since this file is loaded in server.js into api/maps,
 *   these routes are mounted onto /maps
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  //show all maps
  router.get("/", (req, res) => {
    let query = `SELECT * FROM maps`;
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

    //show all maps
    router.get("/:id", (req, res) => {
      console.log(req.params.id)
      let query = `
      SELECT * FROM maps
      JOIN markers ON maps.id = markers.map_id
      WHERE markers.map_id = ${req.params.id}
      `;
      db.query(query)
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
