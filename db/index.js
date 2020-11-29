const { Pool } = require('pg');

const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool
    .query(`
    SELECT * FROM users
    WHERE users.email = $1`, [email])
    .then(
      res => res.rows[0]
    )
    .catch(err => console.log(err))
};
exports.getUserWithEmail = getUserWithEmail;

const login =  function(email, password) {
  return db.getUserWithEmail(email)
  .then(user => {
    if (bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  });
};
exports.login = login;
