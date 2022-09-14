import React from "react";
import "../../styles/paste.scss";
interface pasteProps {
	pasteData: {
		title: string;
		author: string;
		content: string;
		date: Date;
		tags: Array<String>;
		polarity: number;
	};
}

const Paste: React.FC<pasteProps> = ({ pasteData }) => {
	const analizePolarity = (polarity: number) => {
		const styled = polarity < 0 ? { color: "crimson" } : polarity < 0.2 ? { color: "gray" } : { color: "green" };
		return (
			<p style={styled}>
				<span className="material-symbols-outlined">thumbs_up_down</span>
			</p>
		);
	};

	return (
		<div className="Paste">
			<h1>{pasteData.title}</h1>
			<p>Author: {pasteData.author}</p>
			<div className="info">
				<p>{pasteData.date.toString().slice(0, 10)} |&nbsp;</p>
				{analizePolarity(pasteData.polarity)}
				<p>
					{" "}
					&nbsp;|&nbsp; <span className="material-symbols-outlined">label</span>&nbsp;
					{pasteData.tags.map((tag) => tag + ", ")}
				</p>
			</div>
		</div>
	);
};
export default Paste;
