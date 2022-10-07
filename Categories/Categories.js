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

exports.addCategory = async (req, res, next) => {
  const title = req.body.title;
  console.log(title);
  await Test.create(title)
    .then(res.status(201).json({ message: "addedCategory", title }))
    .catch((error) =>
      res.status(401).json({
        message: "User not successful created",
        error: error.mesage,
      })
    );
};
