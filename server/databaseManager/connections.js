const mongoose = require("mongoose");
const { pasteSchema } = require("./schemas");
mongoose.connect(process.env.DB_URL || "mongodb://127.0.0.1:2717/intsight-project", (err) => {
	if (err) console.log(err);
	else console.log("connected");
});
const pastes = mongoose.model("pastes", new mongoose.Schema(pasteSchema));

module.exports = { pastes };
