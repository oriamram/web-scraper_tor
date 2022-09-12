import React, { useEffect, useState } from "react";
import Paste from "./components/pastes/Paste";
import { io } from "socket.io-client";
import axios from "axios";
const paste = {
	title: "Darknet Trusted Links",
	author: "Anonymous",
	date: " 08 Sep 2022, 10:32:10 UTC",
	content: "Darknet Trusted Links\nhttp://xttzwwygbav6pbqeyjm3k2vemhl5zomlwdgz43w3axhpn2pqyokjzyqd.onion/\nFree444",
	coppies: 5,
};

const App = () => {
	const [display, setDisplay] = useState("");

	// useEffect(() => {
	// 	const socket = io("http://localhost:4545");
	// 	socket.on("connect", () => {
	// 		console.log("connected");
	// 		socket.on("fromServer", (data) => {
	// 			console.log(data);
	// 		});
	// 	});
	// }, []);

	return (
		<div>
			<h1>{display}</h1>
			<button
				onClick={() => {
					setDisplay(display + "bsa");
				}}
			>
				aaa
			</button>
			{/* <Paste title={paste.title} author={paste.author} date={new Date(paste.date)} content={paste.content} coppies={paste.coppies} /> */}
		</div>
	);
};

export default App;
