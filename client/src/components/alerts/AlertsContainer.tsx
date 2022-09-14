import React, { FormEvent, useContext, useEffect, useRef, useState } from "react";
import "../../styles/alertsContainer.scss";
import { allPostsContext, paste } from "../../App";
import Alert from "./Alert";

const AlertsContainer: React.FC = () => {
	const allPastes = useContext(allPostsContext);
	const [alertInput, setAlertInput] = useState<string>("");
	const [allAlertsTags, setAllAlerts] = useState<Array<string>>([]);
	const [allAlertsPastes, setAllAlertsPastes] = useState<Array<paste>>([]);

	const onFormSubmit = (e: FormEvent) => {
		e.preventDefault();
		const newAllAlerts = [...allAlertsTags];
		newAllAlerts.push(alertInput);
		setAlertInput("");
		setAllAlerts(newAllAlerts);
	};

	const getAlertsFromPastes = () => {
		let allAlertsPastes = [];
		if (allPastes) {
			allAlertsPastes = allPastes.filter((paste) =>
				allAlertsTags.some((alert) => paste.content.includes(alert) || paste.title.includes(alert) || paste.tags.includes(alert))
			);
			setAllAlertsPastes(allAlertsPastes);
		}
	};

	useEffect(() => {
		getAlertsFromPastes();
	}, [allAlertsTags]);

	return (
		<div className="AlertsContainer">
			<form onSubmit={(e) => onFormSubmit(e)}>
				<input id="alertInput" type="text" placeholder="Create Alert" value={alertInput} onChange={(e) => setAlertInput(e.target.value)} />
			</form>
			<div className="allAlertsList">{allAlertsTags}</div>
			<div className="allAlertsPastes">
				{allAlertsPastes.map((alertPaste) => (
					<Alert key={alertPaste._id} alertPaste={alertPaste} />
				))}
			</div>
		</div>
	);
};

export default AlertsContainer;
