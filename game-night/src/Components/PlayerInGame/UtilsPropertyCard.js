import React from 'react';

import MortgageButton from '../Buttons/MortgageButton';

class UtilsPropertyCard extends React.Component {
	card = {
		backgroundColor: '#777777',
		borderRadius: '5px',
		border: '1px solid black',
		padding: '10px',
		margin: '10px',
		width: '170px'
	};

	colorBox = {
		backgroundColor: '#ffffff',
		border: '1px solid black',
		height: '50px',
		margin: 'auto',
		width: '150px'
	};

	render() {
		return (
			<div className="box">
				<div style={this.card}>
					<div style={this.colorBox}></div>
					<div>
						<p>{this.props.property.Deed}</p>
					</div>
					<hr />
					<div>
						<p>Rent: ${this.props.property.Rent}</p>
					</div>
					<form>
						<input type="number" placeholder="Dice Amount" />
					</form>
					<hr />
					<MortgageButton text={'Mortgage'} color={'#E73B27'} />
				</div>
			</div>
		);
	}
}

export default UtilsPropertyCard;
