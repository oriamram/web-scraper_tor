import React, { useEffect, useState } from "react";
import InputField from "../inputField/InputField";
import Paste from "./Paste";
import "../../styles/pastes/pasteContainer.scss";
import axios from "axios";
import { paste } from "../../interfaces/interfacePaste";

export const PasteContainer: React.FC = () => {
	const [allPastes, setAllPastes] = useState<paste[]>([]);
	const [searchTerm, setSearchTerm] = useState("");

	// generate all the pastes elements by the search term
	const generatePastes = () => {
		return allPastes.map((paste) => (
			<Paste key={paste._id} pasteProps={paste} />
		));
	};

	//wait 500ms and execute request to the server for all pastes that suit the searchTerm
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			axios
				.get("/get_pastes_by_term", {
					params: {
						searchTerm: searchTerm,
					},
				})
				.then((res) => setAllPastes(res.data));
		}, 500);
		return () => {
			clearTimeout(timeoutId);
		};
	}, [searchTerm]);

	return (
		<div className="PasteContainer">
			<InputField
				setInputFieldTerm={(val) => setSearchTerm(val)}
				inputFieldTerm={searchTerm}
			/>
			{generatePastes()}
		</div>
	);
};

export default PasteContainer;
