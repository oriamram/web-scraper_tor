import React from "react";
import { SearchProps } from "../../interfaces/interfaceSearchProps";
import "../../styles/pastes/search.scss";

const Search: React.FC<SearchProps> = ({ setSearchTerm, searchTerm }) => {
	//render controled input element
	return (
		<div className="Search">
			<input
				id="searchField"
				type="text"
				placeholder="search"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
		</div>
	);
};

export default Search;
