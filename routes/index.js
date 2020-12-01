/*
 * All root routes are defined here

 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {

    res.render("index", {user: req.session.userId});
  });
  return router;
};
