import React from "react";
import "../../styles/charts/chartContainer.scss";
import QuantityChart from "./QuantityChart";
import AlertToPastesChart from "./AlertToPastesChart";

const ChartContainer: React.FC = () => {

		return (
			<div className="ChartContainer">
				<QuantityChart />
				<AlertToPastesChart />
			</div>
		);
	};

export default ChartContainer;
