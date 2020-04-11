import React from 'react';

import SmallButton from '../../Buttons/SmallButton';

class SellProperty extends React.Component {
	sellYourProperty = () => {
		const myProperties = [];
		if (this.props.player.property === undefined) {
			return [];
		}
		this.props.player.property.map((property) => {
			return myProperties.push(property);
		});

		return myProperties.map((property) => (
			<option key={property.Deed} value={property.Deed}>
				{property.Deed}
			</option>
		));
	};

	sellToPlayer = () => {
		const players = this.props.otherPlayers;
		if (this.props.otherPlayers.length === 0) {
			return;
		}

		return players.map((player) => (
			<option key={player._id} value={player._id}>
				{player.name}
			</option>
		));
	};

	sellMyProperty = (e) => {
		e.preventDefault();
		const sellTo = {
			selling: this.refs.yourProperty.value,
			buyer: this.refs.buyingPlayer.value,
			amount: e.target.amount.value,
		};

		this.props.sellProperty(sellTo);
	};

	render() {
		return (
			<form onSubmit={this.sellMyProperty}>
				<div>
					<SmallButton text={this.props.text} color={'blue'} />

					<div>
						<select ref="yourProperty">
							{this.sellYourProperty()}
						</select>
					</div>
					<div>
						<select ref="buyingPlayer">
							{this.sellToPlayer()}
						</select>
					</div>
					<input type="number" name="amount" />
				</div>
			</form>
		);
	}
}

export default SellProperty;
