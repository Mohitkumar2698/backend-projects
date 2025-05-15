const { User } = require("../models/userModel.js");

const haveUserMiddleware = async (req, res, next) => {
  const newUser = await User.find({ nameLower: req.params.name });
  if (newUser.length == 0)
    res.json({ status: 404, message: `user ${req.params.name} not found!` });
  req.user = newUser;
  next();
};

module.exports = haveUserMiddleware;
