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

exports.createTestCollection = async (req, res, next) => {
  await Test.createCollection()
    .then((data) => console.log(data))
    .then((data) =>
      res.status(200).json({ message: "Collection created", data })
    )
    .catch((error) =>
      res
        .status(401)
        .json({ message: "An error occurred", error: error.message })
    );
};
