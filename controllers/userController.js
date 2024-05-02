import bcrypt from "bcrypt";
import Users from "../models/userModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import Role from "../models/roleModel.js";
import Permission from "../models/permissionModel.js";

// Define secret key for JWT token
const secretKey = "your_secret_key";

export const getUsers = async (req, res) => {
  try {
    // Retrieve user's role and permissions from JWT token
    const { role, permissions } = req.user;

    // Check if the user's role has necessary permissions
    if (!(role === "admin" && permissions.includes("view_users"))) {
      return res.status(403).json({
        error: "Sorry! You are not authorized to perform this action.",
      });
    }

    const users = await Users.find();
    return res.status(200).json({
      success: true,
      users: users,
      message: "Users Fetched Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const userPostRegister = async (req, res) => {
  const {
    username,
    name,
    email,
    mobile,
    profile_img,
    password,
    role,
    permissions,
  } = req.body;

  try {
    // Validate required fields
    if (!username || !name || !email || !mobile || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Validate email format using validator
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    // Validate phone number format using validator (assuming mobile is a 10-digit number)
    if (!validator.isMobilePhone(mobile, "any", { strictMode: false })) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid phone number format" });
    }

    // Check if user already exists with the same username, email, or mobile
    const existingUser = await Users.findOne({
      $or: [{ username: username }, { email: email }, { mobile: mobile }],
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Find or create default role 'user'
    let defaultRole = await Role.findOne({ name: "user" });
    if (!defaultRole) {
      defaultRole = await Role.create({ name: "user" });
    }
    // Create a new user instance
    const newUser = new Users({
      username,
      name,
      email,
      mobile,
      profile_img,
      password: hashedPassword,
      roles: [defaultRole._id],
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const generateAccessToken = (id, name, role, permissions) => {
  const token_value = {
    userId: id,
    name: name,
    role: role,
    permissions: permissions,
  };
  return jwt.sign(token_value, secretKey);
};

export const userPostLogin = async (req, res) => {
  let usernameOrEmailOrMobile;
  const { username, email, mobile, password } = req.body;

  // Determine the value of usernameOrEmailOrMobile based on which field is provided
  if (username) {
    usernameOrEmailOrMobile = username;
  } else if (email) {
    usernameOrEmailOrMobile = email;
  } else if (mobile) {
    usernameOrEmailOrMobile = mobile;
  } else {
    return res
      .status(400)
      .json({ error: "Please provide username, email, or mobile" });
  }

  try {
    // Find the user by username, email, or mobile and populate the 'roles' field
    const existingUser = await Users.findOne({
      $or: [
        { username: usernameOrEmailOrMobile },
        { email: usernameOrEmailOrMobile },
        { mobile: usernameOrEmailOrMobile },
      ],
    }).populate("roles");

    if (!existingUser) {
      return res
        .status(401)
        .json({
          error: "Seems you are not registered or entered wrong details",
        });
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ error: "You have entered wrong password!" });
    } else {
      // Extract permissions from the user's roles
      const permissions = existingUser.roles.reduce((acc, role) => {
        return acc.concat(role.permissions);
      }, []);

      return res.status(201).json({
        success: "Successful Login",
        token: generateAccessToken(
          existingUser._id,
          existingUser.name,
          permissions 
        ),
      });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};