import React from "react";
import { chart } from "../../interfaces/interfaceChart";
import "../../styles/charts/chartContainer.scss";
import QuantityChart from "./QuantityChart";

const ChartContainer: React.FC<{
	quantityChartData: chart | undefined;
}> = ({ quantityChartData }) => {
	return (
		<div className="ChartContainer">
			<QuantityChart quantityChartData={quantityChartData} />
		</div>
	);
};

export default ChartContainer;
