import React from "react";

interface pasteData {
	title: String;
	content: String;
	coppies: Number;
	date: Date;
	author: String;
}

const Paste: React.FC<pasteData> = ({ title, content, coppies, date, author }) => {
	console.log(date);

	return (
		<div>
			<>
				{title}
				{content}
				{coppies}
				{/* {date} */}
				{author}
			</>
		</div>
	);
};
export default Paste;
