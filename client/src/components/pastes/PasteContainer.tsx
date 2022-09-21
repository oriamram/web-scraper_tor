import React, { useEffect, useRef, useState } from "react";
import InputField from "../inputField/InputField";
import Paste from "./Paste";
import "../../styles/pastes/pasteContainer.scss";
import axios from "axios";
import { paste } from "../../interfaces/interfacePaste";
import { socket } from "../../App";

export const PasteContainer: React.FC = () => {
	const [allPastes, setAllPastes] = useState<paste[]>([]);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const containerRef = useRef(null);
	let container: HTMLDivElement;
	if (containerRef.current) {
		container = containerRef.current;
	}

	const onScroll = async () => {
		if (
			container.scrollTop ===
			container.scrollHeight - container.offsetHeight
		) {
			await axios
				.get("/get_pastes_by_name", {
					params: {
						searchTerm: searchTerm,
						currentPastesLength: allPastes.length,
					},
				})
				.then((res) => {
					if (res.data.length > 0)
						setAllPastes([...allPastes].concat(res.data));
					else {
						console.log("no more pastes to load");
					}
				});
		}
	};

	// generate all the pastes elements by the search term
	const generatePastes = () => {
		return allPastes.map((paste) => (
			<Paste key={paste._id} pasteProps={paste} />
		));
	};

	//wait 500ms and execute request to the server for all pastes that suit the searchTerm
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			getPastes();
		}, 500);
		return () => {
			clearTimeout(timeoutId);
		};
	}, [searchTerm]);

	useEffect(() => {
		socket.on("connect", () => {
			socket.on("newPastesInDb", () => {
				setTimeout(() => {
					alert("New Pastes In Db");
				}, 500);
				if (allPastes.length === 0) {
					getPastes();
				}
			});
		});
	}, []);

	const getPastes = () => {
		axios
			.get("/get_pastes_by_name", {
				params: {
					searchTerm: searchTerm,
					currentPastesLength: 0,
				},
			})
			.then((res) => {
				setAllPastes(res.data);
			});
	};
	return (
		<div ref={containerRef} className="PasteContainer" onScroll={onScroll}>
			<InputField
				setInputFieldTerm={(val) => setSearchTerm(val)}
				inputFieldTerm={searchTerm}
			/>
			{generatePastes()}
		</div>
	);
};

export default PasteContainer;
