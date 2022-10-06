const Categories = require("../model/Categories");

exports.getCategories = async (req, res, next) => {
  await Categories.find({ title: "Hats" })
    .then(
      (data) => res.status(201).json({ message: "categories", data }),
      console.log(data)
    )
    .catch((error) =>
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message })
    );
};
