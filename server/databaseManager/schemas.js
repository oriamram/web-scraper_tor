const { Schema } = require("mongoose");

const pasteSchema = new Schema({
	title: String,
	coppies: Number,
	author: String,
	content: String,
});

module.exports = { pasteSchema };
