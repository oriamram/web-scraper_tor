const { pastes } = require("./connections");

class databaseManager {
	// return all pastes
	async getAllPastes() {
		return await pastes.find({});
	}

	//return only what search term is inside of
	async getPastesByName(searchTerm,currentPastesLength) {
		currentPastesLength = +currentPastesLength < 20 ? 0 : currentPastesLength
		return await pastes.find({ title: { $regex: searchTerm, $options: "i" } }).skip(currentPastesLength).limit(20);
	}

	//return 20 pastes according to term
	async getPasteByTerm(term,currentPastesLength){
		let regexExp = null
		currentPastesLength = +currentPastesLength < 20 ? 0 : currentPastesLength
		if(term){
			regexExp = Array.from(term).join('|')
			return await pastes.find({ $or:[{ title: { $regex: regexExp, $options: "i" } }] }).skip(currentPastesLength).limit(20);
		}else return null

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

	async getPastesCount(){
		return pastes.find({}).count()
	}

	async getAlertsCount(term){
		if(term){
			const regexExp = Array.from(term).join('|')
			return await pastes.find({ $or:[{ title: { $regex: regexExp, $options: "i" } }] }).count()
		}
		else return 0
	}

}

module.exports = databaseManager;
