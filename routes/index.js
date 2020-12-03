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
          templateVars = results.rows
          console.log(`data on load without cookie is: `, templateVars)
          res.render("index", {templateVars})
        })
        .catch(err => console.log(err))
    } else {
      return db
        .query(`
          SELECT * FROM users
          JOIN map_permissions as map_permissions ON users.id = map_permissions.user_id
          JOIN maps as maps ON map_permissions.map_id = maps.id
          WHERE users.id = $1
          GROUP BY map_permissions.id, users.id, maps.id`, [req.session.userId])
        .then(results => {
          templateVars = results.rows
          templateVars.userId = req.session.userId
          console.log(`data on load with cookie is: `, templateVars)
          res.render("index", {templateVars});
        })
        .catch(err => console.log(err))
    }
  });
  return router;
};
