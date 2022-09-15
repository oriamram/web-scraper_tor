import React from "react";
import { paste } from "../../interfaces/interfacePaste";
import "../../styles/pastes/paste.scss";

const Paste: React.FC<{ pasteProps: paste }> = ({ pasteProps }) => {
	//generate the polarity icon according to the polarity status
	const analizePolarity = (polarity: number) => {
		const styled =
			polarity < 0
				? { color: "crimson" }
				: polarity < 0.2
				? { color: "gray" }
				: { color: "green" };
		return (
			<p style={styled}>
				<span className="material-symbols-outlined">thumbs_up_down</span>
			</p>
		);
	};

	return (
		<div className="Paste">
			<h1>{pasteProps.title}</h1>
			<p>{pasteProps.author}</p>
			<div className="info">
				<p>{pasteProps.date.toString().slice(0, 10)} |&nbsp;</p>
				{analizePolarity(pasteProps.polarity)}
				<p>
					&nbsp;|&nbsp; <span className="material-symbols-outlined">label</span>
					&nbsp;
					{pasteProps.tags.map((tag) => tag + ", ")}
				</p>
			</div>
		</div>
	);
};
export default Paste;
