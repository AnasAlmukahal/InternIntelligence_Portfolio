const Skill = require("../models/skills");

exports.getSkills = async (req, res) => {
    try {
        const skills = await Skill.find();
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createSkill = async (req, res) => {
    try {
        const newSkill = new Skill(req.body);
        await newSkill.save();
        res.status(201).json(newSkill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateSkill = async (req, res) => {
    try {
        const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedSkill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteSkill = async (req, res) => {
    try {
        await Skill.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Skill deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
