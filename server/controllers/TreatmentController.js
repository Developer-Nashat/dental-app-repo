const treatment = require("../models/Treatment");

const TreatmentController = {};

TreatmentController.getAllTreatments = async (req, res) => {
  try {
    const result = await treatment.getAllTreatments();

    return res.status(200).json(result.rows);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

TreatmentController.insertTreatment = async (req, res) => {
  try {
    const { treatmentName, description, price } = req.body;

    if (!treatmentName) {
      return res.status(400).json({ message: "يجب ان تدخل اسم المعالجة" });
    }
    if (!price) {
      return res.status(400).json({ message: "يجب ان تدخل قيمة المعالجة" });
    }

    await treatment.insertTreatment([treatmentName, description, price]);
    return res.status(201).json({ message: "تم تعديل المعالجة بنجاح.!" });
  } catch (err) {
    return res.status(500).json({ message: err.message, errorCode: err.code });
  }
};

TreatmentController.updateTreatment = async (req, res) => {
  try {
    const { treatmentId, treatmentName, description, price } = req.body;

    if (!treatmentName) {
      return res.status(400).json({ message: "يجب ان تدخل اسم المعالجة" });
    }
    if (!price) {
      return res.status(400).json({ message: "يجب ان تدخل قيمة المعالجة" });
    }

    await treatment.updateTreatment([
      treatmentId,
      treatmentName,
      description,
      price,
    ]);
    return res.status(201).json({ message: "تم تعديل المعالجة بنجاح.!" });
  } catch (err) {
    return res.status(500).json({ message: err.message, errorCode: err.code });
  }
};
TreatmentController.deleteTreatment = async (parmater) => {
  try {
    const { treatmentId } = req.query;
    await treatment.deleteTreatment([treatmentId]);
    return res.status(201).json({ message: "تم حذف المعالجة بنجاح.!" });
  } catch (err) {
    return res.status(500).json({ message: err.message, errorCode: err.code });
  }
};
module.exports = TreatmentController;
