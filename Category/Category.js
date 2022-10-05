const Category = require("../model/Category");

exports.getCategories = async (req, res, next) => {
  await Category.find()
    .then(() => console.log(req.body))
    .then((category) => res.status(201).json({ message: "Category", category }))
    .catch((error) =>
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message })
    );
};
