import React, { useContext, useState } from "react";
import { allPostsContext } from "../../App";
import Search from "./Search";
import Paste from "./Paste";
import "../../styles/pastes/pasteContainer.scss";

export const PasteContainer: React.FC = () => {
	const allPastes = useContext(allPostsContext);
	const [searchTerm, setSearchTerm] = useState("");

	//generate all the pastes elements by the search term
	const generatePastes = () => {
		return allPastes
			?.filter((paste) =>
				paste.title.toLowerCase().includes(searchTerm.toLowerCase())
			)
			.map((paste) => <Paste key={paste._id} pasteProps={paste} />);
	};

	return (
		<div className="PasteContainer">
			<Search
				setSearchTerm={(val) => setSearchTerm(val)}
				searchTerm={searchTerm}
			/>
			{generatePastes()}
		</div>
	);
};

export default PasteContainer;
