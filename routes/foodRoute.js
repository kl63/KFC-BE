import express from 'express';
import { addFood, listFood, removeFood, editFood } from '../controllers/foodController.js'; // Include the editFood controller
import multer from 'multer';

const foodRouter = express.Router();

// Image Storage Engine (Saving Image to uploads folder & renaming it)
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

// Routes
foodRouter.get("/list", listFood); // Fetch all food items
foodRouter.post("/add", upload.single('image'), addFood); // Add a new food item
foodRouter.post("/remove", removeFood); // Remove a food item
foodRouter.post("/edit", upload.single('image'), editFood); // Edit a food item

export default foodRouter;