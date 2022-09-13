import React, { useContext } from "react";
import "../../styles/pasteContainer.scss";

import Paste from "./Paste";
import { allPostsContext } from "../../App";

export const PasteContainer: React.FC = () => {
	const allPastes = useContext(allPostsContext);

	const generatePastes = () => {
		return allPastes?.map((paste) => <Paste pasteData={paste} />);
	};

	return <div>{generatePastes()}</div>;
};
export default PasteContainer;
