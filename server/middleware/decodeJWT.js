// const jwt = require("jsonwebtoken");

// const decoded = async (req, res, next) => {
//   let token = req.headers?.authorization?.split(" ")[1];
//   try {
//     if (token) {
//       try {
//         let data = await jwt.verify(token, "private-key");
//         if (data) {
//           req.user = data;
//           next();
//         }
//       } catch (error) {
//         res.status(404).json({ error: error });
//       }
//     } else {
//       res.status(401).json({ error: "token not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = decoded;
const jwt = require("jsonwebtoken");

const decoded = async (req, res, next) => {
  let token = req.headers?.authorization?.split(" ")[1];
  try {
    if (token) {
      try {
        let data = await jwt.verify(token, "private-key");
        if (data) {
          req.user = data;
          next();
        }
      } catch (error) {
        res.status(404).json({ error: error });
      }
    } else {
      res.status(401).json({ error: "token not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = decoded;
 
 