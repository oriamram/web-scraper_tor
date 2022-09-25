import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import PasteContainer from "./components/pastes/PasteContainer";
import AlertsContainer from "./components/alerts/AlertsContainer";
import "./styles/app.scss";
import "./styles/loader.scss";
import ChartContainer from "./components/charts/ChartContainer";

export let socket: Socket;
const App: React.FC = () => {
	const [connected, setConnected] = useState<boolean>(false);

	//connecting to the Wss
	useEffect(() => {
		socket = io("http://localhost:4545");
		socket.on("connect", () => {
			console.log("connected");
			setConnected(true);
		});
	}, []);

	//return components or loader depending on the connection status (to wss)
	const waitingForConnection = () => {
		if (connected) {
			return (
				<>
					<AlertsContainer />
					<PasteContainer />
					<ChartContainer  />
				</>
			);
		} else
			return (
				<div className="lds-ring">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			);
	};

	return <div className="App">{waitingForConnection()}</div>;
};

export default App;
