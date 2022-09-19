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

	async getPasteByTerm(Term){
		return await pastes.find({ or:[{title: { $regex: Term, $options: "i" }},{content: { $regex: Term, $options: "i" }},{tag: { $regex: Term, $options: "i" }}] });
	}

	async getAllTagsCount() {
		return await pastes.aggregate([
			{ $project: { tags: 1 } },
			{ $unwind: { path: "$tags" } },
			{
				$group: {
					_id: "$tags",
					sum: { $sum: 1 },
				},
			},
			{
				$project: {
					_id: 0,
					tag: "$_id",
					sum: 1,
				},
			},
		]);
	}
}

module.exports = databaseManager;
