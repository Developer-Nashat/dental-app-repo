const ProblemCatalog = require("../models/ProblemCatalog");

const ProblemCatalogController = {};

ProblemCatalogController.getAllProblemCatalogs = async (req, res) => {
  try {
    console.log(`Result`);
    const result = await ProblemCatalog.getAllProblemCatalogs();

    return res.status(200).json(result.rows);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = ProblemCatalogController;
