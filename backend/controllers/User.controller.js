import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, phoneNumber, password, role } = req.body;
    if (!name || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Please fill in all fields",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already exists",
        success: false,
      });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      phoneNumber,
      password: hashpassword,
      role,
    });
    return res.status(201).json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Please fill in all fields",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email not found",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credential",
        success: false,
      });
    }
    if (role != user.role) {
      return res.status(400).json({
        message: "Invalid credential",
        success: false,
      });
    }
    const tokenData = {
      id: user._id,
      role: user.role,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    user = {
      _id: user._id,
      name: user._id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "Login successful",
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "Logout successful",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, email, phoneNumber } = req.body;

    let user = await User.findById(req.id);
    if (!user) {
      return res.status(404).json({
        message: "User not exist",
        success: true,
      });
    }
    if (name) user.name = name;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    await user.save();
    user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
    };
    return res.status(200).json({
      message: "Profile updated successfully",
      user: user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
