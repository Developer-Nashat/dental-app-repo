const express = require("express");
const router = express.Router();
const problemCatalogController = require("../controllers/ProblemCatalogController");

router.get("/problemCatalog", problemCatalogController.getAllProblemCatalogs);
router.post("/problemCatalog", problemCatalogController.InsertProblemCatalog);
router.put("/problemCatalog", problemCatalogController.UpdateProblemCatalog);
router.delete("/problemCatalog", problemCatalogController.DeleteProblemCatalog);

module.exports = router;
