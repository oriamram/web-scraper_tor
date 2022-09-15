import "chart.js/auto";
// import axios from "axios";
import { Bar, ChartProps } from "react-chartjs-2";
import React, { useContext, useState } from "react";
import { allPostsContext } from "../../App";
import { chart } from "../../interfaces/interfaceChart";
import "../../styles/charts/charts.scss";

const QuantityData: React.FC<{ quantityChartData: chart }> = ({
	quantityChartData,
}) => {
	// const [tags, setTags] = useState([]);
	// const allPosts = useContext(allPostsContext);

	//create data for chart
	// const createData = async () => {
	// 	const tags = (await axios.get("/get_tags")).data;
	// 	setTags(tags);
	// };

	// useEffect(() => {
	// 	createData();
	// }, [allPosts]);

	// generate chart
	// const chartGenerator = () => {
	// 	const data = {
	// 		labels: tags.map((tagObj) => tagObj["tag"]),
	// 		datasets: [
	// 			{
	// 				label: "Quantity Stats",
	// 				data: tags.map((tagObj) => tagObj["sum"]),
	// 				backgroundColor: [
	// 					"gray",
	// 					"rgb(182,133,163)",
	// 					"rgb(240,92,90)",
	// 					"blue",
	// 					"green",
	// 					"rgb(253,199,47)",
	// 					"rgb(66,158,183)",
	// 				],
	// 				borderColor: "black",
	// 				borderWidth: 2,
	// 			},
	// 		],
	// 	};
	// 	return <Bar data={data} />;
	// };

	return (
		<div className="QuantityData">
			{" "}
			<Bar data={quantityChartData} />
		</div>
	);
};

export default QuantityData;
