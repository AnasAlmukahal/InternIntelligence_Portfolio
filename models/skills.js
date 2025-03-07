const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    proficiency: { type: Number, required: true, min: 1, max: 100 },
}, { timestamps: true });

module.exports = mongoose.model("Skill", skillSchema);
