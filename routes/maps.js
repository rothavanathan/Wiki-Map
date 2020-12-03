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


  //show list of all maps
  router.get("/public", (req, res) => {
    //if we don't have cookies
    if (!req.session.userId) {
      let query = `
      SELECT maps.id, owner_id, title, description, thumbnail_photo_url, thumbnail_alt_text, isPublic, users.handle as owner_handle , users.avatar_url FROM maps
      JOIN users ON maps.owner_id = users.id
      WHERE maps.isPublic = true
      `;
      return db.query(query)
        .then(data => {
          const publicMaps = data.rows;
          for (const map of publicMaps) {
            map.permissions = {
            }
          }
          res.json({ publicMaps });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
    //we do have cookies
    } else {
      //select all public maps
      let query = `
      SELECT maps.id, owner_id, title, description, thumbnail_photo_url, thumbnail_alt_text, isPublic, users.handle as owner_handle , users.avatar_url FROM maps
      JOIN users ON maps.owner_id = users.id
      WHERE maps.isPublic = true
      `;
      return db.query(query)
        .then(data1 => {
          let query = `
          SELECT maps.id, map_permissions.user_id, map_permissions.isFavorite, map_permissions.isAuthenticated, map_permissions.isContributor, map_permissions.map_id FROM maps
          JOIN users ON maps.owner_id = users.id
          JOIN map_permissions ON map_permissions.map_id = maps.id
          WHERE map_permissions.user_id = $1
          `;
          db.query(query, [req.session.userId] )
        .then(data2 => {
          const publicMaps = data1.rows;
          const users_map_permissions = data2.rows;
          //check if mapIds are same and join data
          for (const map of publicMaps) {
            map.permissions = {
              isFavorite: false,
              isAuthenticated: false,
              isContributor: false
            }
            for (const map_permissions of users_map_permissions) {
              if (map.id === map_permissions.map_id) {
                map.permissions = {...map_permissions}
              }
            }

          }
          res.json({ publicMaps });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
      })
    }
  });

  //show list of favourite maps for specific user
  router.get("/fave", (req, res) => {
    //if no user cookie
    if (!req.session.userId) {
      res.sendStatus(401).send(`401 - Please login for fave maps`);
    }
    let query = `
      SELECT maps.id, owner_id, title, description, thumbnail_photo_url, thumbnail_alt_text, isPublic, users.handle as owner_handle , users.avatar_url FROM maps
      JOIN users ON maps.owner_id = users.id
      WHERE maps.isPublic = true
      `;
      return db.query(query)
        .then(data1 => {
          let query = `
          SELECT maps.id, map_permissions.user_id, map_permissions.isFavorite, map_permissions.isAuthenticated, map_permissions.isContributor, map_permissions.map_id FROM maps
          JOIN users ON maps.owner_id = users.id
          JOIN map_permissions ON map_permissions.map_id = maps.id
          WHERE map_permissions.user_id = $1 AND map_permissions.isFavorite = true
          `;
          db.query(query, [req.session.userId] )
          .then(data2 => {
            const maps = data1.rows;
            const users_map_permissions = data2.rows;
            const faveMaps = [];

            //merge data
            for (const map of maps) {
              map.permissions = {
                isFavorite: false,
                isAuthenticated: false,
                isContributor: false
              }
              for (const map_permissions of users_map_permissions) {
                if (map.id === map_permissions.map_id) {
                  map.permissions = {...map_permissions}
                  faveMaps.push(map);
                }
              }
            }


            res.json({ faveMaps });
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });
      })
  })

  router.post("/save", (req, res) => {
    // console.log("this happened")
    const owner_id = req.session.userId;
    // console.log("owner_id", owner_id)
    // console.log("this is req.body", req.body)
    const mapData = req.body;
    // console.log(mapData)
    // res.send(mapFormData)
    const query = `
    INSERT INTO maps (owner_id, title, description, thumbnail_photo_url, thumbnail_alt_text, isPublic)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id
    `;
    const params = [owner_id, mapData.title, mapData.description, mapData.thumbnail_photo_url, mapData.thumbnail_alt_text, mapData.isPublic];
    db.query(query, params)
    .then(data => {
      req.session.mapId = data.rows[0]
      console.log("my session map", req.session.mapId.id)
      res.send(data.rows[0])
    })
    .catch(err => {
      console.log(err)
      res.json({err})
    });
  })
  router.post("/permissions", (req,res) => {
    const map_id = req.session.mapId.id;
    const user_id = req.body.key;
    console.log("mapId is", map_id, "user is", user_id, typeof user_id)
    const query = `
    INSERT INTO map_permissions (user_id, map_id, isAuthenticated)
    VALUES ($1, $2, $3)
    `
    const params = [user_id, map_id, true]
    db.query(query, params)
    .then(data => {
      res.json({data})
    })
    .catch(err => {
      res.json({err})
    })
  })
  router.post("/markers", (req, res) => {
    const map_id = req.session.mapId.id;
    const query = `
    INSERT INTO markers (map_id, latlng, title, description, image_url, image_alt_text)
    VALUES ($1, $2, $3, $4, $5, $6)
    `;
    let queryPromises = req.body.map((markerInfo) => {
      const params = [map_id, markerInfo.latlng, markerInfo.title, markerInfo.description, markerInfo.image_url, markerInfo.image_alt_text]
      return db.query(query, params)
    })
    Promise.all(queryPromises)
    .then(data => {
      console.log(data)
      res.json({data})
    })
    .catch(err => {
      console.log(err)
      res.json({err})
    })
  })

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

  return router;

}
