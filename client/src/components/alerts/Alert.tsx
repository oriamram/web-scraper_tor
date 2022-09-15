import React from "react";
import { paste } from "../../interfaces/interfacePaste";
import "../../styles/alerts/alert.scss";

const Alert: React.FC<{ alertProps: paste }> = ({ alertProps: alertPaste }) => {
	return (
		<div className="Alert">
			<h1>{alertPaste.title}</h1>
			<p>{alertPaste.author}</p>
			<p>{alertPaste.date.toString().slice(0, 16).replace("T", " / ")}</p>
		</div>
	);
};

export default Alert;
