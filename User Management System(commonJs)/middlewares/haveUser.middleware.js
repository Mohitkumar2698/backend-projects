const getUsers = require("../routes/getUserRoute");

const notHaveUserMiddleware = (req, res, next) => {
  const data = getUsers();
  const haveUser = data.find(
    (getUser) => getUser.name.toLowerCase() === req.body.name.toLowerCase()
  );
  if (haveUser) {
    res.json({ message: `user ${req.body.name} already exist!` });
  } else {
    next();
  }
};

const haveUserMiddleware = (req, res, next) => {
  const data = getUsers();
  console.log(data);

  const haveUser = data.find(
    (getUser) => getUser.name.toLowerCase() === req.params.name.toLowerCase()
  );
  if (haveUser) {
    req.foundUser = haveUser;
    next();
  }
  res.json({ message: `user ${req.params.name} not found!` });
};

module.exports = { haveUserMiddleware, notHaveUserMiddleware };
