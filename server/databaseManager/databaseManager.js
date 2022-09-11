const mongoose = require("mongoose");
const { pastes } = require("./connections");

class databaseManager {
	// return all pastes
	async getAllPastes() {
		return await pastes.find({});
	}

	//return only what search term is inside of
	async getPasteByName(searchTerm) {
		return await pastes.find({ title: { $regex: searchTerm, $options: "i" } });
	}
}

module.exports = databaseManager;
