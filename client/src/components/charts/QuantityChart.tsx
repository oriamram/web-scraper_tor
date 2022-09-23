import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { chart } from "../../interfaces/interfaceChart";
import "../../styles/charts/charts.scss";

const QuantityChart: React.FC<{ quantityChartData: chart | undefined }> = ({
	quantityChartData,
}) => {
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
