const express = require("express");
const databaseManager = require("./databaseManager/databaseManager");
const app = express();
const PORT = process.env.PORT || 4000;

const db = new databaseManager();

app.get("/", async (req, res) => {
	res.send(await db.getPasteByName("pp"));
});

app.listen(PORT, () => console.log(`listen on ${PORT}`));
