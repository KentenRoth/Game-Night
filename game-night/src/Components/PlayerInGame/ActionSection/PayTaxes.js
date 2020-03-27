import React from 'react';

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

	render() {
		return (
			<div>
				<SmallButton text={this.props.text} color={'green'} />
				<div>
					<p>Tax Amount: ${this.state.tax}</p>
				</div>
			</div>
		);
	}
}

export default PayTaxes;
