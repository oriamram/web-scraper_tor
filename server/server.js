const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const app = express();
const io = require("socket.io")(4545, {
	cors: {
		origin: ["http://localhost:3000"],
	},
});
const databaseManager = require("./databaseManager/databaseManager");
const PORT = process.env.PORT || 4000;


const db = new databaseManager();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(json());

io.on("connection", async (socket) => {
	console.log(socket.id, "is now connected");
	io.emit("connected");
	socket.on("disconnect", () => {
		console.log(socket.id, "disconnected");
	});
});

app.get("/", async (req, res) => {
	res.sendStatus(200);
});

app.get("/get_tags", async (req, res) => {
	res.send(await db.getAllTagsCount());
});

app.get("/bring_new_pastes", async (req, res) => {
	io.emit("newPastesInDb");
	res.sendStatus(204);
});

app.get('/get_pastes_by_name',async(req,res)=>{
	const results = await db.getPastesByName(req.query.searchTerm,req.query.currentPastesLength)
	res.send(results)
})

app.get('/get_pastes_by_term',async (req,res)=>{
	const results = await db.getPasteByTerm(req.query.searchTerm, req.query.currentPastesLength)
	res.send(results)
})

app.listen(PORT, () => console.log(`listen on ${PORT}`));

//todo:
// style
// more information
// content shown on click
// information page