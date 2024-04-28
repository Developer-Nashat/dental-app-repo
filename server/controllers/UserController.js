const user = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {};

userController.login = async (req, res) => {
  try {
    const { username, userPassword } = req.body;

    const result = await user.login([username]);
    if (result.rowCount <= 0) {
      return res.status(404).send({ message: "مستخدم غير موجود" });
    }
    const password = result.rows[0]["user_pwd"];
    const passwordMatched = await bcrypt.compare(userPassword, password);

    if (passwordMatched) {
      let jwtToken = jwt.sign(
        {
          Username: result.rows[0]["username"],
          userId: result.rows[0]["user_id"],
        },
        //Signign the token with the JWT_SECRET in the .env
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      return res.status(200).json({
        accessToken: jwtToken,
        userID: result.rows[0]["user_id"],
        username: result.rows[0]["username"],
      });
    } else {
      return res.status(404).send({ message: "مستخدم غير موجود" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

userController.register = async (req, res) => {
  try {
    const { username, userPassword, name, email, job, isDisabled } = req.body;

    if (!username || !userPassword) {
      return res
        .status(400)
        .json({ message: "يجب ان تدخل اسم المستخدم وكلمة السر" });
    }
    const usr = await user.login([username]);
    if (usr.rowCount > 0) {
      return res.status(409).send({ message: "اسم المستخدم هذا موجود." });
    }
    const hashedUserPassword = await bcrypt.hash(userPassword, 10);

    await user.register([
      username,
      hashedUserPassword,
      name,
      email,
      job,
      isDisabled,
    ]);

    return res.status(201).json({
      message: "تم إضافة المستخدم بنجاح",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

userController.profile = async (req, res) => {
  try {
    const { userID } = req.body;

    const result = await user.GetUserById([userID]);
    if (result.rowCount <= 0) {
      return res.status(404).send({ message: "مستخدم غير موجود" });
    }

    return res.status(200).json(result.rows);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = userController;
