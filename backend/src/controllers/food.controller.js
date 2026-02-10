const foodModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const likeModel = require("../models/likes.model")
const saveModel = require("../models/save.model")
const { v4: uuid } = require("uuid")


// ...existing code...
async function createFood(req, res) {
    try {
        // ensure a file was uploaded
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded. Use form-data key "video" (type: File).' });
        }

        // Get a buffer to upload: prefer multer memory buffer, fallback to reading disk path
        let fileBuffer = req.file.buffer;
        if (!fileBuffer && req.file.path) {
            const fs = require('fs');
            try {
                fileBuffer = fs.readFileSync(req.file.path);
            } catch (fsErr) {
                console.error('Failed to read uploaded file from disk:', fsErr);
                return res.status(400).json({ message: 'Uploaded file is not readable.' });
            }
        }

        if (!fileBuffer) {
            return res.status(400).json({ message: 'Uploaded file is not available for upload.' });
        }
        
        if (!fileBuffer) {
            return res.status(400).json({ message: 'Uploaded file is not available for upload.' });
        }

        const fileUploadResult = await storageService.uploadFile(fileBuffer, uuid());

        const partnerId = (req.foodPartner && req.foodPartner._id) || (req.user && req.user._id) || null;

        const foodItem = await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            // prefer the URL returned by storage service; fallback to multer filename/path if needed
            video: fileUploadResult?.url || req.file.filename || req.file.path,
            foodPartner: partnerId
        });

        res.status(201).json({
            message: "food created successfully",
            food: foodItem
        });
    } catch (err) {
        console.error('createFood error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}