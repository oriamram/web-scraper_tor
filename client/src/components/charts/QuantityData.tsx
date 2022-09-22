import React, { useEffect, useState } from "react";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { chart } from "../../interfaces/interfaceChart";
import "../../styles/charts/charts.scss";
import { socket } from "../../App";

const QuantityData: React.FC<{ quantityChartData: chart | undefined }> = ({
	quantityChartData,
}) => {
	const [quantityChartData9, setquantityChartData9] = useState<
		chart | undefined
	>();

	return (
		<div className="QuantityData">
			{quantityChartData ? (
				<Bar data={quantityChartData} />
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

export default QuantityData;
