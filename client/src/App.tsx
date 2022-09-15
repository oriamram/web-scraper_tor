import axios from "axios";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import QuantityData from "./components/charts/QuantityData";
import PasteContainer from "./components/pastes/PasteContainer";
import AlertsContainer from "./components/alerts/AlertsContainer";
import { paste } from "./interfaces/interfacePaste";
import { tag } from "./interfaces/interfaceTag";
import { chart } from "./interfaces/interfaceChart";
import "./styles/app.scss";
import "./styles/loader.scss";

//context for all of the pastes
export const allPostsContext = React.createContext<Array<paste> | null>(null);

let quantityChartData: chart;

const App: React.FC = () => {
	const [allPastes, setAllPastes] = useState<Array<paste> | null>(null);
	const [connected, setConnected] = useState<boolean>(false);

	//connecting to the Wss
	useEffect(() => {
		const socket = io("http://localhost:4545");
		socket.on("connect", () => {
			console.log("connected");
			socket.on("newPastesToLoad", (pastes: Array<paste>) => {
				setAllPastes(pastes);
				setConnected(true);
			});
		});

		const createData = async () => {
			const tags = (await axios.get("/get_tags")).data;
			quantityChartData = {
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
			};
		};
		createData();
	}, []);

	//return components or loader depending on the connection status (to wss)
	const waitingForConnection = () => {
		if (connected) {
			return (
				<allPostsContext.Provider value={allPastes}>
					<AlertsContainer />
					<PasteContainer />
					<QuantityData quantityChartData={quantityChartData} />
				</allPostsContext.Provider>
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
