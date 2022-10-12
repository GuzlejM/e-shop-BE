const Category = require("../model/Category");

exports.createCategory = async (req, res, next) => {
  const { title } = req.body;
  console.log(req.body);

  await Category.create({ title })
    .then((category) =>
      res.status(200).json({
        message: `Category ${category.title} with ID: ${category.id} created`,
        category: title,
      })
    )
    .catch((error) =>
      res
        .status(401)
        .json({ message: "An error occurred", error: error.message })
    );
};

exports.getAllCategories = async (req, res, next) => {
  await Categories.find()
    .then((categories) =>
      res.status(200).json({ message: "Categories list", categories })
    )
    .catch((error) =>
      res
        .status(401)
        .json({ message: "An error occurred", error: error.message })
    );
};
