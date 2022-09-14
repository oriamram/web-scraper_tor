import React from "react";
import { paste } from "../../App";

const Alert: React.FC<{ alertPaste: paste }> = ({ alertPaste }) => {
	return (
		<div className="Alert">
			<h1>{alertPaste.title}</h1>
			<p>Author: {alertPaste.author}</p>
			<p>{alertPaste.date.toString().slice(0, 16).replace("T", " / ")}</p>
		</div>
	);
};

export default Alert;
