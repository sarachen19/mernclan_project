import React from "react";
import Card from "./Card";

const AllCards = (props) => {
	const group = props.group;
	return group.cards.map((card, index) => (
		<Card key={index} index={index} card={card} />
	));
};

export default AllCards;
