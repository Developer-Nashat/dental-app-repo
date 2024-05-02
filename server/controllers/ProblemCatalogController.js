const problemCatalog = require("../models/ProblemCatalog");

const ProblemCatalogController = {};

ProblemCatalogController.getAllProblemCatalogs = async (req, res) => {
  try {
    const result = await problemCatalog.getAllProblemCatalogs();

    return res.status(200).json(result.rows);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

ProblemCatalogController.InsertProblemCatalog = async (req, res) => {
  try {
    const { problemCatalogName } = req.body;

    if (!problemCatalogName) {
      return res.status(400).json({ message: "يجب ان تدخل تصنيف المشكلة" });
    }

    await problemCatalog.InsertProblemCatalog([problemCatalogName]);
    return res.status(201).json({ message: "تم إضافة تصنيف المشكلة بنجاح.!" });
  } catch (err) {
    return res.status(500).json({ message: err.message, errorCode: err.code });
  }
};

ProblemCatalogController.UpdateProblemCatalog = async (req, res) => {
  try {
    const { problemCatalogName, problemCatalogId } = req.body;

    if (!problemCatalogName) {
      return res.status(400).json({ message: "يجب ان تدخل تصنيف المشكلة" });
    }

    await problemCatalog.UpdateProblemCatalog([
      problemCatalogName,
      problemCatalogId,
    ]);
    return res.status(201).json({ message: "تم تعديل تصنيف المشكلة بنجاح.!" });
  } catch (err) {
    return res.status(500).json({ message: err.message, errorCode: err.code });
  }
};

ProblemCatalogController.DeleteProblemCatalog = async (req, res) => {
  try {
    const { problemCatalogId } = req.query;
    await problemCatalog.DeleteProblemCatalog([problemCatalogId]);
    return res.status(201).json({ message: "تم حذف تصنيف المشكلة بنجاح.!" });
  } catch (err) {
    return res.status(500).json({ message: err.message, errorCode: err.code });
  }
};

module.exports = ProblemCatalogController;
