import { React, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Group from "./Group";

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
				{add && <Group add={add} count={allGroups.length} />}
			</span>
			{allGroups.map((group, index) => (
				<Group
					style={{ height: "100%" }}
					key={index}
					group={group}
					add={false}
				/>
			))}
		</div>
	);
};

export default AllGroups;
