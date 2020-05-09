import React from 'react';

import MortgageButton from '../../Buttons/MortgageButton';

class PropertyCard extends React.Component {
	card = {
		backgroundColor: '#777777',
		borderRadius: '5px',
		border: '1px solid black',
		padding: '10px',
		margin: '10px',
		width: '170px',
	};

	colorBox = {
		backgroundColor: this.props.property.Color,
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

	letsGetMoreMoney = (value) => {
		this.props.mortgageOrBuy(value);
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
					<div>
						<p>House Cost: ${this.props.property.HouseCost}</p>
					</div>
					<div>
						{/* This will need function */}
						<p># of Houses: 0</p>
					</div>
					<div>
						{/* This will need function to figure out */}
						<p>Hotel: No</p>
					</div>
					<hr />
					<MortgageButton
						text={'Buy House'}
						color={'#18AC4C'}
						CanBuyHouse={this.props.property.CanBuyHouse}
						property={this.props.property}
						whatToDo={this.letsGetMoreMoney}
					/>
					<MortgageButton
						text={this.mortgageText()}
						color={'#E73B27'}
						property={this.props.property}
						whatToDo={this.letsGetMoreMoney}
					/>
				</div>
			</div>
		);
	}
}

export default PropertyCard;
