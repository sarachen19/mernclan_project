import { React, useState } from "react";
import Group from "./Group";
import "./allGroups.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AllGroups = (props) => {
	const [allGroups, setAllGroups] = useState([
		{
			groupName: "Week 1",
			cards: [
				{
					value: "Change master bedroom bedsheet",
					checklists: [
						{
							key: 0,
							checklistName: "Checklist",
							todo: [
								{
									text: "Change master bedroom bedsheet",
									finished: true,
								},
								{
									text: "Prepare next week's lunch",
									finished: true,
								},
								{
									text: "Buy grocery",
									finished: true,
								},
								{
									text: "Visit doctor",
									finished: true,
								},
							],
						},
					],
					labels: ["bg-success"],
					dueDate: "",
					description: "",
					comments: [],
					cover: "cover_image_4",
					attachment: "",
					groupKey: 1,
				},
			],
			key: 1,
		},
	]);
	const [newGroup, setNewGroup] = useState("");
	const [add, setAdd] = useState(false);
	const onGroupAdd = (group) => {
		if (group !== null) {
			let temp = allGroups;
			temp = [...temp, group];
			setAllGroups(temp);
			setAdd(false);
		} else {
			setAdd(false);
		}
	};
	const onCardsChange = (group, newCard) => {
		//todo
		//
		//
		//
		//
		console.log("oncardschange function called in root");
	};
	return (
		<div className="d-flex" style={{ height: "100%" }}>
			<span className="flex-columnx order-1">
				{!add && (
					<button
						className="btn btn-light btn-sm add-group-button"
						onClick={(e) => {
							e.preventDefault();
							setAdd(true);
						}}
					>
						&#43; Add another group
					</button>
				)}
			</span>
			{add && (
				<Group add={add} count={allGroups.length} onGroupAdd={onGroupAdd} />
			)}
			{allGroups.map((group, index) => (
				<Group
					style={{ height: "100%" }}
					key={index}
					group={group}
					add={false}
					onCardsChange={onCardsChange}
				/>
			))}
		</div>
	);
};

export default AllGroups;
