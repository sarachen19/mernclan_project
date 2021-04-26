import { React, useState, useEffect } from "react";
import Group from "./Group";
import "./allGroups.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const AllGroups = (props) => {
	// const [allGroups, setAllGroups] = useState([
	// 	{
	// 		groupName: "Week 1",
	// 		cards: [
	// 			{
	// 				value: "Change master bedroom bedsheet",
	// 				checklists: [
	// 					{
	// 						key: 0,
	// 						checklistName: "Checklist",
	// 						todo: [
	// 							{
	// 								text: "Change master bedroom bedsheet",
	// 								finished: true,
	// 							},
	// 							{
	// 								text: "Prepare next week's lunch",
	// 								finished: true,
	// 							},
	// 							{
	// 								text: "Buy grocery",
	// 								finished: true,
	// 							},
	// 							{
	// 								text: "Visit doctor",
	// 								finished: true,
	// 							},
	// 						],
	// 					},
	// 				],
	// 				labels: ["bg-success"],
	// 				dueDate: "",
	// 				description: "",
	// 				comments: [],
	// 				cover: "cover_image_4",
	// 				attachment: "",
	// 				groupKey: 1,
	// 			},
	// 		],
	// 		key: 1,
	// 	},
	// ]);

	const [groups, setGroups] = useState([]);
	useEffect(() => {
		var tempdata = [];
		//let token = localStorage.getItem("token");
		let token = sessionStorage.getItem("token");
		let config = {
			headers: {
				"Content-Type": "application/json",
				"x-auth-token": token,
			},
		};

		axios
			.get("https://mern-clan.herokuapp.com/api/task/group", config)
			.then((response) => {
				//console.log(response.data);
				let temp = response.data;
				temp.map((group, index) => {
					let g = {
						groupName: group.groupName,
						cards: group.cards,
						user: group.user,
						groupId: group._id,
					};
					tempdata = [...tempdata, g];
				});
				setGroups(tempdata);
			});
	}, []);

	const [refresh, setRefresh] = useState(false);
	const [add, setAdd] = useState(false);
	// const onGroupAdd = (group) => {
	// 	if (group !== null) {
	// 		//let temp = allGroups;
	// 		//temp = [...temp, group];
	// 		//setAllGroups(temp);
	// 		setAdd(false);
	// 		console.log("on add group" + group.groupName);
	// 	} else {
	// 		setAdd(false);
	// 	}
	// };

	const onGroupAdd = (group) => {
		if (group != null) {
			//let token = localStorage.getItem("token");
			let token = sessionStorage.getItem("token");
			let config = {
				headers: {
					"Content-Type": "application/json",
					"x-auth-token": token,
				},
			};

			let data = {
				groupName: group.groupName,
			};
			try {
				const response = axios.post(
					"https://mern-clan.herokuapp.com/api/task/group",
					data,
					config
				);
				setAdd(false);
				setRefresh(!refresh);
			} catch (e) {
				console.log(e.response.data.errors);
			}
		} else {
			setAdd(false);
		}
	};

	const onCardsChange = (group, newCard) => {
		console.log("oncardschange function called in root");
		if (group != null) {
			let config = {
				headers: {
					"Content-Type": "application/json",
				},
			};

			let data = {
				groupId: group.groupId,
				value: newCard.value,
			};
			try {
				const response = axios.post(
					"https://mern-clan.herokuapp.com/api/task/card/add",
					data,
					config
				);
				setRefresh(!refresh);
			} catch (e) {
				console.log(e.response.data.errors);
			}
		} else {
		}
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
			{add && <Group add={add} count={groups.length} onGroupAdd={onGroupAdd} />}
			{groups.map((group, index) => (
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
