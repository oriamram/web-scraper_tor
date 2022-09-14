import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import QuantityData from "./components/charts/QuantityData";
import PasteContainer from "./components/pastes/PasteContainer";
import "./styles/app.scss";
import "./styles/loader.scss";

import AlertsContainer from "./components/alerts/AlertsContainer";

export const allPostsContext = React.createContext<Array<paste> | null>(null);
export interface paste {
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
	const [connected, setConnected] = useState<boolean>(false);

	useEffect(() => {
		const socket = io("http://localhost:4545");
		socket.on("connect", () => {
			console.log("connected");
			socket.on("newPastesToLoad", (pastes: Array<paste>) => {
				setAllPastes(pastes);
				setConnected(true);
			});
		});
	}, []);

	const waitingForConnection = () => {
		if (connected) {
			return (
				<>
					<allPostsContext.Provider value={allPastes}>
						<AlertsContainer />
						<PasteContainer />
						<QuantityData />
					</allPostsContext.Provider>
				</>
			);
		} else
			return (
				<>
					<div className="lds-ring">
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</>
			);
	};

	return <div className="App">{waitingForConnection()}</div>;
};

export default App;
