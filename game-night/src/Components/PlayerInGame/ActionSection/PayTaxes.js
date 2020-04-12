import React from 'react';
import axios from 'axios';

import SmallButton from '../../Buttons/SmallButton';

class PayTaxes extends React.Component {
	constructor(props) {
		super(props);
		this.state = { tax: 0 };
	}

	nobodyLikesTaxes = () => {
		let netWorth = this.props.player.netWorth * 0.1;
		let taxAmount = 0;

		if (netWorth > 200) {
			taxAmount = 200;
		} else {
			taxAmount = netWorth;
		}
		return this.setState({ tax: parseInt(taxAmount, 10) });
	};

	componentDidUpdate(prevProps) {
		if (prevProps !== this.props) {
			if (this.props.player.name === undefined) {
				return;
			}
			this.nobodyLikesTaxes();
		}
	}

	payTaxes = (e) => {
		const myID = this.props.player._id;
		const myFunds = this.props.player.money;
		e.preventDefault();
		if (this.state.tax > myFunds) {
			return;
		}
		axios.patch(`/ingameuser/${myID}`, {
			money: myFunds - this.state.tax,
		});
	};

	render() {
		return (
			<form onSubmit={this.payTaxes}>
				<SmallButton text={this.props.text} color={'green'} />
				<div>
					<p style={{ fontSize: '18px' }}>
						Tax Amount:{' '}
						<span style={{ color: 'red' }}>${this.state.tax}</span>
					</p>
				</div>
			</form>
		);
	}
}

export default PayTaxes;
