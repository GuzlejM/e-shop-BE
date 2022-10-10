const Categories = require("../model/Categories");

exports.createCategory = async (req, res, next) => {
  const { title } = req.body;
  await Categories.create({ title })
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
  await Categories.find({ title: "Hats" })
    .then((category) =>
      res.status(200).json({ message: "Categories list", category })
    )
    .catch((error) =>
      res
        .status(401)
        .json({ message: "An error occurred", error: error.message })
    );
};
