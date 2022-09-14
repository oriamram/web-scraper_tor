import React, { useContext, useState } from "react";
import Search from "./Search";
import "../../styles/pasteContainer.scss";
import Paste from "./Paste";
import { allPostsContext } from "../../App";

export const PasteContainer: React.FC = () => {
	const allPastes = useContext(allPostsContext);
	const [searchTerm, setSearchTerm] = useState("");

	const generatePastes = () => {
		return allPastes?.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase())).map((paste) => <Paste pasteData={paste} />);
	};
	return (
		<div className="PasteContainer">
			<Search setSearchTerm={(val) => setSearchTerm(val)} searchTerm={searchTerm} />
			{generatePastes()}
		</div>
	);
};
export default PasteContainer;
