const Card = (props) => {
	return (
		<>
			<div>
				<p></p>
				<div className="d-flex">
					<p className="card-cardname">{props.card.value}</p>
					<span
						className="card-icons-hide"
						data-toggle="tooltip"
						data-html="true"
						title={props.card.description}
					></span>
				</div>

				{props.card.checklists.map((checklist, index) => {
					return <p key={index}>checklist</p>;
				})}
			</div>
		</>
	);
};

export default Card;
