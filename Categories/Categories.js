const Test = require("../model/Test");

// exports.getCategories = async (req, res, next) => {
//   await Test.find({ title: "Hats" })
//     .then(
//       (data) => res.status(201).json({ message: "categories", data }),
//       console.log(data)
//     )
//     .catch((error) =>
//       res
//         .status(400)
//         .json({ message: "An error occurred", error: error.message })
//     );
// };

exports.saveToCollection = async (req, res, next) => {
  const title = req.body;
  await Test.create(title)
    .then((title) => console.log(title))
    .then((title) =>
      res.status(200).json({ message: "Collection created", title: title })
    )
    .catch((error) =>
      res
        .status(401)
        .json({ message: "An error occurred", error: error.message })
    );
};
