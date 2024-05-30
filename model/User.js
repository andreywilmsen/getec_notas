let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlenght: 3, maxlenght: 30 },
    email: { type: String, required: true },
    password: { type: String, required: true, minlenght: 5, maxlenght: 30 },
    admin: { type: Boolean, default: false },
    createdAt: { type: Date, required: true, default: Date.now() }
});

module.exports = User = mongoose.model("User", userSchema)