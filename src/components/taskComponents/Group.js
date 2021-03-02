import React, { Component, useState } from "react";
import AllCards from "./AllCards";
import Card from "./Card";
import Validators from "./validators";
import "./allGroups.css";
import "bootstrap/dist/css/bootstrap.min.css";
const Group = (props) => {
	const [group, setGroup] = useState({
		groupName: "",
		cards: [],
		key: "",
	});
	const [add, setAdd] = useState(props.add || false);
	const groupNameInput = React.createRef();
	const addGroupSubmit = (e) => {
		e.preventDefault();
		const name = groupNameInput.current.value;
		if (Validators.isEmpty(name) === false) {
			let temp = group;
			temp.groupName = name;
			temp.key = props.count;
			setGroup(temp);
			setAdd(false);
			props.onGroupAdd(group);
		}
	};
	if (add)
		return (
			<form onSubmit={addGroupSubmit}>
				<input type="text" ref={groupNameInput} defaultValue=""></input>
				<br />
				<button type="submit" className="btn btn-success btn-sm">
					Add
				</button>
			</form>
		);
	else
		return (
			<div className="d-flex-cloumn justify-content-between group-header">
				<p id="group-name-show">{props.group.groupName}</p>

				<AllCards
					key={props.group.key}
					group={props.group}
					onCardsChange={props.onCardsChange}
				/>

				<Card
					add={true}
					count={props.group.cards.length}
					group={props.group}
					onCardsChange={props.onCardsChange}
				/>
			</div>
		);
};

export default Group;
