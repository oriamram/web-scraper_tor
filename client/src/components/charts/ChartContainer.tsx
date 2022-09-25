import React, { useState,useEffect } from "react";
import axios from "axios";
import "../../styles/charts/chartContainer.scss";
import QuantityChart from "./QuantityChart";
import AlertToPastesChart from "./AlertToPastesChart";
import { socket } from "../../App";

const ChartContainer: React.FC = () => {

		return (
			<div className="ChartContainer">
				<QuantityChart />
				<AlertToPastesChart />
			</div>
		);
	};

export default ChartContainer;
