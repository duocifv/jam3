const { validationResult } = require("express-validator");
const message = require("http-errors");

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      message(
        400,
        errors
          .array()
          .map((err) => err.msg)
          .join(", ")
      )
    );
  }
  next();
};
