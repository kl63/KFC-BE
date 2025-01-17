import bcrypt from 'bcrypt';
import validator from 'validator';
import adminModel from '../models/adminModel.js';

// Register Admin
const registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if admin already exists
        const existingAdmin = await adminModel.findOne({ email });
        if (existingAdmin) {
            return res.json({ success: false, message: 'Admin already exists' });
        }

        // Validate email and password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Invalid email format' });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: 'Password must be at least 8 characters' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save admin to database
        const newAdmin = new adminModel({ name, email, password: hashedPassword });
        await newAdmin.save();

        res.json({ success: true, message: 'Admin registered successfully' });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'An error occurred' });
    }
};

export { registerAdmin };
