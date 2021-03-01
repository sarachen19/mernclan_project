import React, { Component } from "react";
import AllCards from "./AllCards";
const Group = (props) => {
	const addGroupSubmit = (e) => {
		e.preventDefault();
		// const name = this.groupNameInput.current.value;
		// if (Validators.isEmpty(name) === false) {
		// 	let temp = this.state.group;
		// 	temp.groupName = name;
		// 	temp.key = this.props.count;
		// 	this.setState({ group: temp, add: false });
		// 	this.props.onGroupAdd(this.state.group);
		// }
	};
	const groupNameInput = React.createRef();
	return (
		<>
			{props.add && (
				<form onSubmit={addGroupSubmit}>
					<input type="text" ref={groupNameInput} defaultValue=""></input>
					<br />
					<button type="submit" className="btn btn-success btn-sm">
						Add
					</button>
				</form>
			)}
			{!props.add && <AllCards key={props.group.key} group={props.group} />}
		</>
	);
};

export default Group;
