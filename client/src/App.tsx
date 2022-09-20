import axios from "axios";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import QuantityData from "./components/charts/QuantityData";
import PasteContainer from "./components/pastes/PasteContainer";
import AlertsContainer from "./components/alerts/AlertsContainer";
import { tag } from "./interfaces/interfaceTag";
import { chart } from "./interfaces/interfaceChart";
import "./styles/app.scss";
import "./styles/loader.scss";

const App: React.FC = () => {
	const [connected, setConnected] = useState<boolean>(false);
	const [quantityChartData, setQuantityChartData] = useState<chart>();
	const [reRender, setReRender] = useState({});
	const socket = io("http://localhost:4545");

	const dataCreator = async () => {
		console.log("ssss");
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
		socket.on("connect", () => {
			console.log("connected");
			dataCreator();
			socket.on("connected", () => {
				setConnected(true);
			});
		});
	}, []);

	useEffect(() => {
		socket.on("newPastesToLoad", () => {
			if (!connected) {
				console.log("heyhey");
			} else {
				setReRender({});
				dataCreator();
			}
		});
	});

	//return components or loader depending on the connection status (to wss)
	const waitingForConnection = () => {
		if (connected) {
			return (
				<>
					<AlertsContainer />
					<PasteContainer />
					<QuantityData quantityChartData={quantityChartData} />
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
