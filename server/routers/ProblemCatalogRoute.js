const express = require("express");
const router = express.Router();
const problemCatalogController = require("../controllers/ProblemCatalogController");

router.get("/problemCatalog", problemCatalogController.getAllProblemCatalogs);
router.post("/problemCatalog", problemCatalogController.InsertProblemCatalog);
router.put("/problemCatalog", problemCatalogController.UpdateProblemCatalog);

module.exports = router;
