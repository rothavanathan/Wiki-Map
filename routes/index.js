/*
 * All root routes are defined here

 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    //no cookie we render the logged out bare bones page
    if (!req.session.userId) {
      return db
        .query(`SELECT maps.id, owner_id, title, description, thumbnail_photo_url, thumbnail_alt_text, isPublic, users.handle as owner_handle , users.avatar_url FROM maps
        JOIN users ON maps.owner_id = users.id
        WHERE maps.isPublic = true`)
        .then(results => {
          res.render("index", {results})
        })
    } else {
      return db
        .query(`
          SELECT * FROM users
          JOIN map_permissions as map_permissions ON users.id = map_permissions.user_id
          JOIN maps as maps ON map_permissions.map_id = maps.id
          WHERE users.id = $1
          GROUP BY map_permissions.id, users.id, maps.id`, [req.session.userId])
        .then(results => {
          results.userId = req.session.userId
          res.render("index", {results});
        })
    }
  });
  return router;
};
