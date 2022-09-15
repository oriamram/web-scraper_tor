import React, { FormEvent, useContext, useEffect, useState } from "react";
import { allPostsContext } from "../../App";
import Alert from "./Alert";
import { paste } from "../../interfaces/interfacePaste";
import "../../styles/alerts/alertsContainer.scss";
import "../../styles/alerts/alertInput.scss";

const AlertsContainer: React.FC = () => {
	const allPastes = useContext(allPostsContext);
	const [alertInput, setAlertInput] = useState<string>("");
	const [allAlertTags, setAllAlertsTags] = useState<Array<string>>(
		JSON.parse(localStorage.getItem("Scraper-Alerts-Tags")!) || []
	);
	const [allAlertsPastes, setAllAlertsPastes] = useState<Array<paste>>([]);

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
	const getPastesFromAlertTags = () => {
		let allAlertsPastes = [];
		if (allPastes) {
			allAlertsPastes = allPastes.filter((paste) =>
				allAlertTags.some(
					(alert) =>
						paste.content.toLowerCase().includes(alert) ||
						paste.title.toLowerCase().includes(alert) ||
						paste.tags.includes(alert)
				)
			);
			setAllAlertsPastes(allAlertsPastes);
		}
	};

	useEffect(() => {
		getPastesFromAlertTags();
	}, [allAlertTags, allPastes]);

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
		<div className="AlertsContainer">
			<form onSubmit={(e) => onFormSubmit(e)}>
				<input
					id="alertInput"
					type="text"
					placeholder="Create Alert"
					value={alertInput}
					onChange={(e) => setAlertInput(e.target.value)}
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
