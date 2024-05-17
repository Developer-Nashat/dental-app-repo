const express = require("express");
const router = express.Router();
const treatmentController = require("../controllers/TreatmentController");

router.get("/treatment", treatmentController.getAllTreatments);
router.post("/treatment", treatmentController.insertTreatment);
router.put("/treatment", treatmentController.updateTreatment);
router.delete("/treatment", treatmentController.deleteTreatment);

module.exports = router;
