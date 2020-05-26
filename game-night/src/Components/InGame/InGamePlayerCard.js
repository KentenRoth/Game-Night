import React from 'react';

import SmallButton from '../Buttons/SmallButton';

const InGamePlayerCard = (props) => {
	const isCorrectPlayer = (e) => {
		e.preventDefault();
		const userInfo = {
			name: props.players.name,
			pin: e.target.number.value,
		};
		props.saveGameInfo(userInfo);
	};

	return (
		<div style={boxContent}>
			<div>
				<form onSubmit={isCorrectPlayer}>
					<p>{props.players.name}</p>
					<input
						type="password"
						name="number"
						placeholder="Pin Number"
					/>
					{/* <hr style={hrStyle} />
					<div className="row">
						<div className="col-6">
							<p>Cash</p>
						</div>
						<div className="col-6">
							<p>Net Worth</p>
						</div>
					</div>
					<div className="row">
						<div className="col-6" style={moneyStyle}>
							{props.players.money}
						</div>
						<div className="col-6" style={netStyle}>
							{props.players.netWorth}
						</div>
					</div>
					<p># of Properties: {props.players.property.length}</p> */}
					<SmallButton color={'#0F76C0'} text={'Lets Play'} />
				</form>
			</div>
		</div>
	);
};

const boxContent = {
	backgroundColor: '#555555',
	border: '2px solid  #B7DAF5',
	borderRadius: '10px',
	margin: '10px auto',
	padding: '10px',
	width: '250px',
};

// const hrStyle = {
// 	border: '0',
// 	borderTop: '2px solid  #B7DAF5',
// 	height: '1px',
// 	margin: '2px auto',
// 	width: '90%',
// };

// const moneyStyle = {
// 	fontSize: '18px',
// 	color: '#18f04C',
// };

// const netStyle = {
// 	fontSize: '18px',
// 	fontWeight: 'bold',
// 	color: '#18AC4C',
// };

export default InGamePlayerCard;
