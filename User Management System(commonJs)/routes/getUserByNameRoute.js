// getUser by name
const getUsersByName = (requestObj) => {
  const response = {
    message: `Fetching ${requestObj.foundUser.name} data...`,
    result: requestObj.foundUser,
  };
  return response;
};

module.exports = getUsersByName;
