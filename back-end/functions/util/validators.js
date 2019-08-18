//Checks if email looks Valid
exports.isValidEmail = email => {
  return (
    email.includes("@") &&
    email.includes(".") &&
    email.split("@").length > 1 &&
    email.split("@")[1] !== ""
  );
};

exports.isEmpty = field => {
    return field === ''
}