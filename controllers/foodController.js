
import foodModel from "../models/foodModel.js";
import fs from 'fs'

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}

// add food
const addFood = async (req, res) => {

    try {
        let image_filename = `${req.file.filename}`

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category:req.body.category,
            image: image_filename,
        })

        await food.save();
        res.json({ success: true, message: "Food Added" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// delete food
const removeFood = async (req, res) => {
    try {

        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => { })

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Food Removed" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }

}
// edit food
const editFood = async (req, res) => {
    try {
        const { id, name, description, price, category } = req.body;

        // Find the food item by ID
        const food = await foodModel.findById(id);

        if (!food) {
            return res.json({ success: false, message: "Food item not found" });
        }

        // Update the fields
        food.name = name || food.name;
        food.description = description || food.description;
        food.price = price || food.price;
        food.category = category || food.category;

        // If a new image is uploaded, replace the old one
        if (req.file) {
            fs.unlink(`uploads/${food.image}`, () => {}); // Remove the old image
            food.image = req.file.filename;
        }

        // Save the updated food item
        await food.save();

        res.json({ success: true, message: "Food Updated Successfully", data: food });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating food item" });
    }
};

export { listFood, addFood, removeFood, editFood };