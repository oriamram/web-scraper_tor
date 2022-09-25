export interface chart {
	labels: any;
	datasets: {
		label: string;
		data: any;
		backgroundColor?: string[];
		borderColor?: string;
		borderWidth?: number;
		color?: string
	}[];
}
