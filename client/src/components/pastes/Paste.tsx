import React, { useRef, useState } from "react";
import { paste } from "../../interfaces/interfacePaste";
import "../../styles/pastes/paste.scss";

const Paste: React.FC<{ pasteProps: paste }> = ({ pasteProps }) => {
	const [showContent, setShowContent] = useState<string>("0");
	const [display, setDisplay] = useState("none");

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

	const changeDisplay = () => {
		if (showContent === "0") {
			setShowContent("1000px");
			setDisplay("block");
		} else {
			setShowContent("0");
			setTimeout(() => {
				setDisplay("none");
			}, 1000);
		}
	};

	return (
		<div className="Paste" onClick={changeDisplay}>
			<h1>{pasteProps.title}</h1>
			<p>{pasteProps.author}</p>
			<div className="info">
				<p className="infoP">
					{pasteProps.date.toString().slice(0, 10)} |&nbsp;
				</p>
				{analizePolarity(pasteProps.polarity)}
				<p className="infoP">
					&nbsp;|&nbsp; <span className="material-symbols-outlined">label</span>
					&nbsp;
					{pasteProps.tags.map((tag) => tag + ", ")}
				</p>
			</div>
			<div
				className="contentContainer"
				style={{ maxHeight: showContent, transition: "1s" }}
			>
				<h3 style={{ display }}>content:</h3>
				<p style={{ display }}>{pasteProps.content}</p>
			</div>
		</div>
	);
};
export default Paste;
