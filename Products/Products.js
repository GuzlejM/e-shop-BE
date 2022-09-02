const Category = require("../model/Category");

exports.createCategory = async (req, res, next) => {
  const { title, items } = req.body;
  console.log("hitting it");

  await Category.create({
    title,
  })
    .then((category) => {
      res.status(201).json({
        message: "Category created successfully",
        category: category._id,
      });
    })
    .catch((error) =>
      res.status(401).json({
        message: "Category not successfully created",
        error: error.mesage,
      })
    );
};
