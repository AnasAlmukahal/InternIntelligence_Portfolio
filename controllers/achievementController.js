const Achievement = require("../models/achievements");

exports.getAchievements = async (req, res) => {
    try {
        const achievements = await Achievement.find();
        res.status(200).json(achievements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createAchievement = async (req, res) => {
    try {
        const newAchievement = new Achievement(req.body);
        await newAchievement.save();
        res.status(201).json(newAchievement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateAchievement = async (req, res) => {
    try {
        const updatedAchievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedAchievement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteAchievement = async (req, res) => {
    try {
        await Achievement.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Achievement deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
