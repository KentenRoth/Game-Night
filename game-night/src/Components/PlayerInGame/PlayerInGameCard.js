import React from 'react';

const PlayerInGameCard = props => {
	console.log(props);
	return (
		<div style={boxContent}>
			<div className="title">
				<p>{props.players.name}</p>
			</div>
			<hr style={hrStyle} />
			<div className="row">
				<div className="col-6">
					<p style={moneyStyle}>{props.players.money}</p>
				</div>
				<div className="col-6">
					<p style={netStyle}>{props.players.netWorth}</p>
				</div>
			</div>
			<div>
				<p># of Properties {props.players.property.length}</p>
			</div>
		</div>
	);
};

const boxContent = {
	backgroundColor: '#555555',
	border: '2px solid #B7DAF5',
	borderRadius: '10px',
	width: '200px',
	margin: '10px auto'
};

const hrStyle = {
	border: '0',
	borderTop: '2px solid  #B7DAF5',
	height: '1px',
	margin: '2px auto',
	width: '90%'
};

const moneyStyle = {
	fontSize: '18px',
	color: '#18f04C'
};

const netStyle = {
	fontSize: '18px',
	fontWeight: 'bold',
	color: '#18AC4C'
};

export default PlayerInGameCard;
