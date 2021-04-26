import { React, useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";

const AllCards = (props) => {
	const [allCards, setAllCards] = useState([]);
	const [needrefresh, setRefresh] = useState(false);
	useEffect(() => {
		let config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		let data = {
			groupId: props.group.groupId,
		};

		var tempCards = [];
		axios
			.post("https://mern-clan.herokuapp.com/api/task/card/", data, config)
			.then((response) => {
				//console.log(response.data);
				let temp = response.data;
				temp.map((card, index) => {
					let c = {
						value: card.value,
						checklists: card.checklists,
						labels: card.labels,
						dueDate: card.dueDate,
						description: card.description,
						comments: card.comments,
						cover: card.cover,
						attachment: card.attachment,
						groupKey: card.group,
						cardId: card._id,
					};
					tempCards = [...tempCards, c];
				});
				setAllCards(tempCards);
			});
	}, []);
	const refresh = () => {
		setRefresh(!needrefresh);
		let config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		let data = {
			groupId: props.group.groupId,
		};

		var tempCards = [];
		axios
			.post("https://mern-clan.herokuapp.com/api/task/card/", data, config)
			.then((response) => {
				let temp = response.data;
				temp.map((card, index) => {
					let c = {
						value: card.value,
						checklists: card.checklists,
						labels: card.labels,
						dueDate: card.dueDate,
						description: card.description,
						comments: card.comments,
						cover: card.cover,
						attachment: card.attachment,
						groupKey: card.group,
						cardId: card._id,
					};
					tempCards = [...tempCards, c];
				});
				setAllCards(tempCards);
			});
	};
	const group = props.group;
	return allCards.map((card, index) => (
		<Card
			key={index}
			index={index}
			card={card}
			group={group}
			onCardsChange={props.onCardsChange}
			refresh={refresh}
		/>
	));
};

export default AllCards;
