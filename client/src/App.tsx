import axios from "axios";
import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import PasteContainer from "./components/pastes/PasteContainer";
import AlertsContainer from "./components/alerts/AlertsContainer";
import { tag } from "./interfaces/interfaceTag";
import { chart } from "./interfaces/interfaceChart";
import "./styles/app.scss";
import "./styles/loader.scss";
import ChartContainer from "./components/charts/ChartContainer";

export let socket: Socket;
const App: React.FC = () => {
	const [connected, setConnected] = useState<boolean>(false);
	const [quantityChartData, setQuantityChartData] = useState<chart>();

	const dataCreator = async () => {
		const tags = (await axios.get("/get_tags")).data;
		setQuantityChartData({
			labels: tags.map((tagObj: tag) => tagObj["tag"]),
			datasets: [
				{
					label: "Quantity Stats",
					data: tags.map((tagObj: tag) => tagObj["sum"]),
					backgroundColor: [
						"gray",
						"rgb(182,133,163)",
						"rgb(240,92,90)",
						"blue",
						"green",
						"rgb(253,199,47)",
						"rgb(66,158,183)",
					],
					borderColor: "black",
					borderWidth: 2,
				},
			],
		});
	};

	//connecting to the Wss
	useEffect(() => {
		dataCreator();
		socket = io("http://localhost:4545");
		socket.on("connect", () => {
			console.log("connected");
			setConnected(true);
			socket.on("newPastesInDb", () => {
				dataCreator();
			});
		});
	}, []);

	//return components or loader depending on the connection status (to wss)
	const waitingForConnection = () => {
		if (connected) {
			return (
				<>
					<AlertsContainer />
					<PasteContainer />
					<ChartContainer quantityChartData={quantityChartData} />
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
