const { Schema } = require("mongoose");

const pasteSchema = new Schema({
	title: String,
	coppies: Number,
	author: String,
	content: String,
	date: Date,
	tags: Array,
	polarity: Number,
});

module.exports = { pasteSchema };
