import "chart.js/auto";
import { Bar, ChartProps } from "react-chartjs-2";
import React, { useContext, useState } from "react";
import { allPostsContext } from "../../App";
import { chart } from "../../interfaces/interfaceChart";
import "../../styles/charts/charts.scss";

const QuantityData: React.FC<{ quantityChartData: chart | undefined }> = ({
	quantityChartData,
}) => {
	console.log("a");

	return (
		<div className="QuantityData">
			{quantityChartData ? (
				<Bar data={quantityChartData} />
			) : (
				<div className="lds-ring">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			)}
		</div>
	);
};

export default QuantityData;
