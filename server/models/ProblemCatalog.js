const { pool } = require("../config/db.config");

const ProblemCatalog = {};

ProblemCatalog.getAllProblemCatalogs = async () => {
  const result = await pool.query(
    `SELECT "ProblemCatalogID",
            "ProblemCatalogName"
       FROM "fn_GetAllProblemCatalogs"()`
  );

  return result;
};

module.exports = ProblemCatalog;
