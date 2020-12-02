/*
 * All root routes are defined here

 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {

    res.render("index", {userId: req.session.userId, handle: req.session.handle, avatar: req.session.avatar});
  });
  return router;
};
