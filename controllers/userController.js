import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import mongoose from "mongoose"; // Import mongoose for ObjectId validation
import userModel from "../models/userModel.js";

// Create token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        const salt = await bcrypt.genSalt(10); // Higher rounds increase hashing time
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// List users
const listUsers = async (req, res) => {
    try {
        const users = await userModel.find(); // Fetch all users from the database
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ success: false, message: "Error fetching user list" });
    }
};

// Remove a user
const removeUser = async (req, res) => {
    try {
        const { id } = req.params; // Use req.params to get the ID from the URL
        console.log("Received User ID:", id);  // Log the ID to verify it's correct

        // Validate if ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID format' });
        }

        const user = await userModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, message: 'User removed successfully' });
    } catch (error) {
        console.error('Error removing user:', error);
        res.status(500).json({ success: false, message: 'Error removing user' });
    }
};

// Export all functions
export { loginUser, registerUser, listUsers, removeUser };
