import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import React from "react";

import { chart } from "../../interfaces/interfaceChart";
import "../../styles/charts/charts.scss";

const QuantityData: React.FC<{ quantityChartData: chart | undefined }> = ({
	quantityChartData,
}) => {
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
