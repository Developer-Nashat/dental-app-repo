const { pool } = require("../config/db.config");

const User = {};

User.getAllUsers = async () => {
  const result = await pool.query(`SELECT * FROM fn_get_all_users()`);

  return result;
};

User.login = async (parameters) => {
  const result = await pool.query(`SELECT * FROM fn_login($1)`, parameters);

  return result;
};

User.GetUserByName = async (parameters) => {
  const result = await pool.query(
    `SELECT * FROM fn_get_user_by_name($1)`,
    parameters
  );

  return result;
};

User.GetUserById = async (parameters) => {
  const result = await pool.query(
    `SELECT * FROM fn_get_user_by_id($1)`,
    parameters
  );

  return result;
};

User.register = async (parameters) => {
  const result = await pool.query(
    `Call sp_insert_user($1, $2, $3, $4, $5, $6)`,
    parameters
  );

  return result;
};

User.update = async (parameters) => {
  const result = await pool.query(
    `Call sp_update_user($1, $s2, $3, $4, $5, $6, $7)`,
    parameters
  );

  return result;
};

User.Delete = async (parameters) => {
  const result = await pool.query(`Call sp_delete_user($1)`, parameters);

  return result;
};

module.exports = User;
