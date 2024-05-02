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

ProblemCatalog.UpdateProblemCatalog = async (parmater) => {
  const result = await pool.query(
    `CALL "sp_UpdateProblemCatalog"($1, $2)`,
    parmater
  );

  return result;
};

ProblemCatalog.DeleteProblemCatalog = async (parmater) => {
  const result = await pool.query(
    `CALL "sp_DeleteProblemCatalog"($1)`,
    parmater
  );

  return result;
};

module.exports = ProblemCatalog;
