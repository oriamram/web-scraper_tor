import React, { useState } from "react";
import "../../styles/search.scss";

interface SearchProps {
	setSearchTerm: (val: string) => void;
	searchTerm: string;
}

const Search: React.FC<SearchProps> = ({ setSearchTerm, searchTerm }) => {
	return (
		<div className="Search">
			<input id="searchField" type="text" placeholder="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
		</div>
	);
};

export default Search;
