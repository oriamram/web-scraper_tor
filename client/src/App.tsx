import React from "react";
import Paste from "./components/pastes/Paste";

const paste = {
	title: "Darknet Trusted Links",
	author: "Anonymous",
	date: " 08 Sep 2022, 10:32:10 UTC",
	content: "Darknet Trusted Links\nhttp://xttzwwygbav6pbqeyjm3k2vemhl5zomlwdgz43w3axhpn2pqyokjzyqd.onion/\nFree444",
	coppies: 5,
};

const App = () => {
	return (
		<div>
			<Paste title={paste.title} author={paste.author} date={new Date(paste.date)} content={paste.content} coppies={paste.coppies} />
		</div>
	);
};

export default App;
