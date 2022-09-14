import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import QuantityData from "./components/charts/QuantityData";
import PasteContainer from "./components/pastes/PasteContainer";
import "./styles/App.scss";

export const allPostsContext = React.createContext<Array<paste> | null>(null);
interface paste {
	_id: string;
	title: string;
	author: string;
	content: string;
	date: Date;
	tags: Array<String>;
	polarity: number;
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
				<QuantityData />
			</allPostsContext.Provider>
		</div>
	);
};

export default App;
