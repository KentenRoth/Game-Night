import React from 'react';

import SmallButton from '../../Buttons/SmallButton';

class PayPlayer extends React.Component {
	whatPlayer = () => {
		return this.props.allPlayers.map(player => (
			<option key={player._id} value={player._id}>
				{player.name}
			</option>
		));
	};

	payPlayer = e => {
		let payOut = {
			player: this.refs.player.value,
			amount: e.target.amount.value
		};
		e.preventDefault();
		this.props.payPlayer(payOut);
	};

	render() {
		return (
			<form onSubmit={this.payPlayer}>
				<div>
					<SmallButton
						text={this.props.text}
						color={'green'}
						type={'submit'}
					/>
					<div>
						<select ref="player">{this.whatPlayer()}</select>
					</div>
					<input
						name="amount"
						type="number"
						placeholder={'Amount to Player'}
					/>
				</div>
			</form>
		);
	}
}

export default PayPlayer;
