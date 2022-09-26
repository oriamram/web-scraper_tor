import React, { FormEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import Alert from "./Alert";
import { socket } from "../../App";
import { paste } from "../../interfaces/interfacePaste";
import InputField from "../inputField/InputField";
import "../../styles/alerts/alertsContainer.scss";
import "../../styles/alerts/alertInput.scss";

const AlertsContainer: React.FC = () => {
	const [alertInput, setAlertInput] = useState<string>("");
	const [allAlertsPastes, setAllAlertsPastes] = useState<Array<paste>>([]);
	const [allAlertTags, setAllAlertsTags] = useState<Array<string>>(
		JSON.parse(localStorage.getItem("Scraper-Alerts-Tags")!) || []
	);
	const containerRef = useRef(null);
	let container: HTMLDivElement;
	if (containerRef.current) {
		container = containerRef.current;
	}

	//load more alerts on scroll
	const onScroll = async () => {
		if (
			container.scrollTop >=
			container.scrollHeight - container.offsetHeight
		) {
			await axios
				.get("/get_pastes_by_term", {
					params: {
						searchTerm: allAlertTags,
						currentPastesLength: allAlertsPastes.length,
					},
				})
				.then((res) => {
					if (res.data.length > 0)
						setAllAlertsPastes([...allAlertsPastes].concat(res.data));
					else {
						console.log("no more pastes to load");
					}
				});
		}
	};

	//search for term and set localstorage
	const onFormSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (alertInput.length > 0 && !allAlertTags.includes(alertInput)) {
			const newAllAlertsTags = [...allAlertTags];
			newAllAlertsTags.push(alertInput);
			setAlertInput("");
			setAllAlertsTags(newAllAlertsTags);
			localStorage.setItem(
				"Scraper-Alerts-Tags",
				JSON.stringify(newAllAlertsTags)
			);
		} else {
			alert("Not a valid insert");
		}
	};

	//find all the pastes that includes the tag and set state
	const getPastesFromAlertTags = async (tags = allAlertTags) => {
		if (tags.length > 0) {
			const allRelevantPastes: paste[] = (
				await axios.get("/get_pastes_by_term", {
					params: {
						searchTerm: tags,
						currentPastesLength: allAlertsPastes.length,
					},
				})
			).data;		
			if (allRelevantPastes.length !== allAlertsPastes.length) {
				setAllAlertsPastes(allRelevantPastes);
			}
		} else {
			setAllAlertsPastes([]);
		}
	};

	useEffect(() => {
			socket.on("newPastesInDb", () => {
				socket.emit('allAlertsTags',allAlertTags)
				getPastesFromAlertTags();
			});
	}, []);

	useEffect(() => {
		socket.emit('allAlertsTags',allAlertTags)
		getPastesFromAlertTags();

	}, [allAlertTags]);

	//remove tag by click on it
	const removeTag = (element: React.MouseEvent<HTMLElement>) => {
		for (let i = 0; i < allAlertTags.length; i++) {
			if (allAlertTags[i] === element.currentTarget.id) {
				let newAllAlertTags = [...allAlertTags];
				newAllAlertTags.splice(i, 1);
				setAllAlertsTags(newAllAlertTags);
				localStorage.setItem(
					"Scraper-Alerts-Tags",
					JSON.stringify(newAllAlertTags)
				);
				break;
			}
		}
	};

	//creates a tag
	const createAlertTags = () => {
		return allAlertTags.map((tag) => (
			<div
				className="alertTag"
				id={tag}
				key={tag}
				onClick={(e) => removeTag(e)}
			>
				{tag}
			</div>
		));
	};

	return (
		<div ref={containerRef} className="AlertsContainer" onScroll={onScroll}>
			<form onSubmit={(e) => onFormSubmit(e)}>
				<InputField
					inputFieldTerm={alertInput}
					setInputFieldTerm={setAlertInput}
				/>
			</form>
			<div className="allAlertsList">{createAlertTags()}</div>
			<div className="allAlertsPastes">
				{allAlertsPastes.map((alertProps) => (
					<Alert key={alertProps._id} alertProps={alertProps} />
				))}
			</div>
		</div>
	);
	
};

export default AlertsContainer;
