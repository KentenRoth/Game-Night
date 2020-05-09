import React from 'react';

import MortgageButton from '../../Buttons/MortgageButton';

class RRPropertyCard extends React.Component {
	card = {
		backgroundColor: '#777777',
		borderRadius: '5px',
		border: '1px solid black',
		padding: '10px',
		margin: '10px',
		width: '170px',
	};

	colorBox = {
		backgroundColor: '#999999',
		border: '1px solid black',
		height: '50px',
		margin: 'auto',
		width: '150px',
	};

	mortgageText = () => {
		if (this.props.property.IsMortgaged === false) {
			return 'Mortgage';
		}
		return 'Un-Mortgage';
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
					<hr />
					<MortgageButton
						text={this.mortgageText()}
						color={'#E73B27'}
						property={this.props.property}
					/>
				</div>
			</div>
		);
	}
}

export default RRPropertyCard;
