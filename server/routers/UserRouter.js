const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const verifyToken = require("../middlewares/auth.middleware");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/profile", verifyToken, userController.profile);

module.exports = router;

// module.exports = function (app) {
//   app.use((req, res, next) => {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });

//   app.post("/login", user.login);
// };
