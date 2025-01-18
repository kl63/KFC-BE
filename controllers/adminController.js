import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import adminModel from "../models/adminModel.js";
import mongoose from "mongoose";

// Create token
const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);

// Login admin
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await adminModel.findOne({ email });

        if (!admin) {
            return res.json({ success: false, message: "Admin does not exist" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(admin._id);
        res.json({ success: true, token });
    } catch (error) {
        console.error("Error logging in admin:", error);
        res.status(500).json({ success: false, message: "Error logging in admin" });
    }
};

// Register admin
const registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await adminModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "Admin already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new adminModel({ name, email, password: hashedPassword });
        const admin = await newAdmin.save();
        const token = createToken(admin._id);
        res.json({ success: true, token });
    } catch (error) {
        console.error("Error registering admin:", error);
        res.status(500).json({ success: false, message: "Error registering admin" });
    }
};

// List admins
const listAdmins = async (req, res) => {
    try {
        const admins = await adminModel.find();
        res.status(200).json({ success: true, data: admins });
    } catch (error) {
        console.error("Error fetching admins:", error);
        res.status(500).json({ success: false, message: "Error fetching admin list" });
    }
};





export { loginAdmin, registerAdmin, listAdmins };

