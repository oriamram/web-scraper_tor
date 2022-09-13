import React from "react";

interface pasteData {
	pasteData: {
		title: String;
		coppies: Number;
		author: String;
		content: String;
		date: Date;
		tags: Array<String>;
		polarity: Number;
	};
}
// type paste = pasteData;

const Paste: React.FC<pasteData> = ({ pasteData }) => {
	return <div></div>;
};
export default Paste;
