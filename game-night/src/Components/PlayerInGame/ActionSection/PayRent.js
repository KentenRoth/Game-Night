import React from 'react';

import SmallButton from '../../Buttons/SmallButton';

class PayRent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		};

		this.payRent = this.payRent.bind(this);
	}
	rentPayingProperty = () => {
		const propertyArray = [];
		this.props.allPlayers.map(player => {
			player.property.map(property => {
				return propertyArray.push(property);
			});
			return [];
		});

		return propertyArray.map(propertyDeed => (
			<option
				key={propertyDeed.Deed}
				value={propertyDeed.Rent}
				id={propertyDeed.Rent}
			>
				{propertyDeed.Deed} ${propertyDeed.Rent}
			</option>
		));
	};

	payRent = e => {
		e.preventDefault();
		this.props.payRent(this.refs.payment.value);
	};

	render() {
		return (
			<form onSubmit={this.payRent}>
				<div>
					<SmallButton
						text={this.props.text}
						color={'blue'}
						type={'submit'}
					/>
				</div>
				<select ref="payment" onChange={this.propertyRent}>
					{this.rentPayingProperty()}
				</select>
			</form>
		);
	}
}

export default PayRent;
