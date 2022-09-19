import React from "react";
import { InputFieldProps } from "../../interfaces/interfaceInputFieldProps";

const InputField: React.FC<InputFieldProps> = ({
	setInputFieldTerm,
	inputFieldTerm,
}) => {
	//render controled input element
	return (
		<div className="InputField">
			<input
				className="inputField"
				type="text"
				placeholder="  . . . . . . . . "
				value={inputFieldTerm}
				onChange={(e) => setInputFieldTerm(e.target.value)}
			/>
		</div>
	);
};

export default InputField;
