import React, { userState, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
const Checklist = (props) => {
	const [newChecklist, setnewChecklist] = useState({
		//key: this.props.card.checklists.length,
		checklistName: "",
		todo: [],
	});
	const [addChecklist, setaddChecklist] = useState(props.addChecklist || false);
	var checklistInput = React.createRef();

	const ProgessBar = (checklist) => {
		if (checklist.todo.length === 0) {
			return null;
		} else {
			let count = 0;
			let total = 0;
			checklist.todo.forEach((todo) => {
				if (todo.finished === true) {
					count++;
				}
				total++;
			});
			const percentage = parseInt((count / total) * 100);
			const width = percentage + "%";
			return (
				<div
					className="progress"
					style={{ height: "10px", backgroundColor: "#FEEFC1" }}
				>
					<div
						className="progress-bar"
						style={{
							width: width,
							height: "10px",
							backgroundColor: "#f8ce4f",
						}}
					>
						{percentage}%
					</div>
				</div>
			);
		}
	};
	const handleAddChecklistSubmit = (e) => {
		e.preventDefault();
		setaddChecklist(false);
	};

	const AddChecklist = () => {
		return (
			<form onSubmit={handleAddChecklistSubmit} id="addChecklistForm">
				<input
					type="text"
					placeholder="enter checklist name"
					ref={checklistInput}
					defaultValue="Checklist"
				/>
				<button className="btn btn-success btn-sm" type="submit">
					Add
				</button>
			</form>
		);
	};
	const toggleTodo = (e, checklist, oneTodo, todoIndex) => {
		e.stopPropagation();
	};

	const Checklist2 = () => {
		return (
			<div>
				<div className="d-flex align-items-center">
					<span className="dot"></span>
					<p>{"  " + props.checklist.checklistName}</p>
				</div>
				{ProgessBar(props.checklist)}
				{props.checklist.todo.map((todo, index) => {
					return (
						<div key={index}>
							<p
								className="todo-text-indent"
								style={{
									textDecoration: todo.finished ? "line-through" : "none",
									display: "inline-block",
								}}
								key={index}
								onClick={(e) => toggleTodo(e, props.checklist, todo, index)}
							>
								{todo.text}
							</p>
						</div>
					);
				})}
			</div>
		);
	};

	if (addChecklist) {
		return <AddChecklist />;
	} else if (props.checklist !== undefined) {
		return <Checklist2 />;
	}
	return null;
};
export default Checklist;
