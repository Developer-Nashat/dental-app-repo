const whiteList = ["http://localhost:5173"];

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed By CORS"));
    }
  },
  optionSuccessStatus: 200,
};

module.exports = corsOptions;
