import jwt from "jsonwebtoken";
import Users from "../models/userModel.js";

const authenticate = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ Error: "Missing or invalid Authorization header" });
    }
    
    // Split "Bearer " from the token
    const token = authHeader.split(' ')[1];

    // Verify the token
    const newUser = jwt.verify(token, 'secretkey');
    const user = await Users.findOne({ _id: newUser.userId });

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ Error: "Authentication Error" });
  }
};

export default authenticate;
