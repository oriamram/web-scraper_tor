import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { useEffect, useState } from "react";
import { chart } from "../../interfaces/interfaceChart";
import { tag } from "../../interfaces/interfaceTag";
import "../../styles/charts/charts.scss";
import { socket } from "../../App";

const QuantityChart:React.FC = () => {
	const [quantityChartData, setQuantityChartData] = useState<chart>();

	const dataCreator = async () => {
		const tags = (await axios.get("/api/get_tags")).data;
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

	useEffect(()=>{
		dataCreator()
			socket.on("newPastesInDb", () => {
				dataCreator()
			});
	},[])


	return (
		<div className="QuantityData">
			{quantityChartData ? (
				<Bar
					data={quantityChartData}
					options={{
						responsive: true,
						scales: {
							y: {
								ticks: { color: "black" },
							},
							x: {
								ticks: { color: "black" },
							},
						},
						plugins:{
							legend:{
								display:false,

							}
						}
					}}
				/>
			) : (
				<div className="lds-ring2">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			)}
		</div>
	);
};

export default QuantityChart;
