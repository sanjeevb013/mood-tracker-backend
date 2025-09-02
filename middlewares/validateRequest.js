const validate = () => (req, res, next) => {
  // No validation logic
  console.log("Skipping validation, req.body:", req.body);
  next();
};


module.exports = { validate };