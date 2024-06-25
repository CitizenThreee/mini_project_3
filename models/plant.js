const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//The plant data structure. An id is auto generated each time a plant is created.
const plantSchema = new Schema({
    name: { type: String, trim: true, required: true },
    scientific_name: { type: String, trim: true },
    cycle: { type: String },
    watering: { type: String },
    sunlight: [{ type: String }],
    default_image: { type: String },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("plant", plantSchema);