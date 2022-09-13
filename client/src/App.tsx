import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import PasteContainer from "./components/pastes/PasteContainer";
import "./styles/App.scss";

export const allPostsContext = React.createContext<Array<paste> | null>(null);
interface paste {
	title: String;
	coppies: Number;
	author: String;
	content: String;
	date: Date;
	tags: Array<String>;
	polarity: Number;
}

const App: React.FC = () => {
	const [allPastes, setAllPastes] = useState<Array<paste> | null>(null);

	useEffect(() => {
		const socket = io("http://localhost:4545");
		socket.on("connect", () => {
			console.log("connected");
			socket.on("newPastesToLoad", (pastes: Array<paste>) => {
				setAllPastes(pastes);
			});
		});
	}, []);

	return (
		<div className="App">
			<allPostsContext.Provider value={allPastes}>
				<PasteContainer />
				{/* <Paste title={paste.title} author={paste.author} date={new Date(paste.date)} content={paste.content} coppies={paste.coppies} /> */}
			</allPostsContext.Provider>
		</div>
	);
};

export default App;
