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

	howManyHouses = () => {
		let property = this.props.property;
		if (property.Rent === property.House1) {
			return 1;
		}
		if (property.Rent === property.House2) {
			return 2;
		}
		if (property.Rent === property.House3) {
			return 3;
		}
		if (property.Rent === property.House4) {
			return 4;
		}
		return 0;
	};

	doesHaveHotel = () => {
		if (this.props.property.Rent === this.props.property.Hotel) {
			return 'Yes';
		}
		return 'No';
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
						<p># of Houses: {this.howManyHouses()}</p>
					</div>
					<div>
						{/* This will need function to figure out */}
						<p>Hotel: {this.doesHaveHotel()}</p>
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
						text={'Sell House'}
						color={'#E73B27'}
						property={this.props.property}
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
