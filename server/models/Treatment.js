const { pool } = require("../config/db.config");

const Treatment = {};

Treatment.getAllTreatments = async () => {
  const result = await pool.query(
    `SELECT "TreatmentID",
            "TreatmentName",
            "Description",
            "Price"
       FROM "fn_GetAllTreatments"()`
  );

  return result;
};

Treatment.insertTreatment = async (parmater) => {
  const result = await pool.query(
    `CALL "sp_InsertTreatement"($1, $2, $3)`,
    parmater
  );

  return result;
};

Treatment.updateTreatment = async (parmater) => {
  const result = await pool.query(
    `CALL "sp_UpdateTreatment"($1, $2, $3, $4)`,
    parmater
  );

  return result;
};

Treatment.deleteTreatment = async (parmater) => {
  const result = await pool.query(`CALL "sp_DeleteTreatment"($1)`, parmater);

  return result;
};

module.exports = Treatment;
