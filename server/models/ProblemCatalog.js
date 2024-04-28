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

ProblemCatalog.InsertProblemCatalog = async (parmater) => {
  const result = await pool.query(
    `CALL "sp_InsertProblemCatalog"($1)`,
    parmater
  );

  return result;
};

module.exports = ProblemCatalog;
