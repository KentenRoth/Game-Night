import React from 'react';
import SmallButton from '../../Buttons/SmallButton';

class PayUtilities extends React.Component {
	whoHasUtilites = () => {
		const utilitiesOwned = [];
		this.props.utilities.map((player) => {
			player.property.map((property) => {
				if (
					property.Deed === 'Electric Company' ||
					property.Deed === 'Water Works'
				) {
					utilitiesOwned.push({
						utility: property.Deed,
						player: player._id,
						multiplyBy: property.Rent,
					});
				}
				return [];
			});
			return [];
		});

		return utilitiesOwned.map((property) => (
			<option
				key={property.utility}
				value={property.player}
				name={property.multiplyBy}
			>
				{property.utility}
			</option>
		));
	};

	payUtilityBill = (e) => {
		let pay = {
			userID: this.refs.utility.value,
			diceAmount: e.target.amount.value,
			multiplyBy: parseInt(
				this.refs.utility.selectedOptions[0].attributes[1].value
			),
		};
		e.preventDefault();
		this.props.payUtilities(pay);
	};

	render() {
		return (
			<form onSubmit={this.payUtilityBill}>
				<div>
					<SmallButton
						text={'Pay Utilities'}
						color={'green'}
						type={'submit'}
					/>
					<div>
						<select ref="utility">{this.whoHasUtilites()}</select>
					</div>
					<input
						type="number"
						name="amount"
						placeholder="Dice Amount"
					/>
				</div>
			</form>
		);
	}
}

export default PayUtilities;
