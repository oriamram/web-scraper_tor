import React, { useEffect, useState } from "react";
import "chart.js/auto";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "../../styles/charts.scss";

const QuantityData: React.FC = () => {
	const [tags, setTags] = useState([]);

	const createData = async () => {
		const tags = (await axios.get("/get_tags")).data;
		setTags(tags);
	};

	useEffect(() => {
		createData();
	}, []);
	const data = {
		labels: tags.map((tagObj) => tagObj["tag"]),
		datasets: [
			{
				label: "Quantity Stats",
				data: tags.map((tagObj) => tagObj["sum"]),
				backgroundColor: ["gray", "rgb(182,133,163)", "rgb(240,92,90)", "blue", "green", "rgb(253,199,47)", "rgb(66,158,183)"],
				borderColor: "black",
				borderWidth: 2,
			},
		],
	};

	return (
		<div className="QuantityData">
			<Bar data={data} />
		</div>
	);
};

export default QuantityData;
