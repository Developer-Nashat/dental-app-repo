const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOption");

require("dotenv").config();

const userRouter = require("./routers/UserRouter");
const ProblemCatalogRoute = require("./routers/ProblemCatalogRoute");
const treatmentRoute = require("./routers/treatmentRoute");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRouter);
app.use(ProblemCatalogRoute);
app.use(treatmentRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// const fetchUsers = async () => {
//   try {
//     const res = await User.login(["Nashat"]);
//     console.log(res.rows[0]["user_pwd"]);
//   } catch (err) {
//     console.error(`Error fetching users: ${err}`);
//   }
// };

// fetchUsers();
