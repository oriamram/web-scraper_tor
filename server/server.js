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

io.on("connection", (socket) => {
	console.log(socket.id);
	socket.on("custom", (number) => {
		console.log(number);
	});
	io.emit("fromServer", 100);
});

app.get("/", async (req, res) => {
	res.send(await db.getAllPastes());
});

app.get("/bring_new_pastes", async (req, res) => {
	console.log("now finding");
	res.send("okok");
});

app.listen(PORT, () => console.log(`listen on ${PORT}`));
