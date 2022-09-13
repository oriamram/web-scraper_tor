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
	io.emit("newPastesToLoad", await db.getAllPastes());
	socket.on("custom", (number) => {
		console.log(number);
	});
	socket.on("disconnect", () => {
		console.log(socket.id, "disconnected");
	});
});

app.get("/", async (req, res) => {
	res.send();
});

app.get("/bring_new_pastes", async (req, res) => {
	io.emit("newPastesToLoad", await db.getAllPastes());
	res.send("okok");
});

app.listen(PORT, () => console.log(`listen on ${PORT}`));
