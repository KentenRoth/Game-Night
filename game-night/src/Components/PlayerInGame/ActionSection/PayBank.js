import React from 'react';

import SmallButton from '../../Buttons/SmallButton';

class PayBank extends React.Component {
	payBank = e => {
		e.preventDefault();
		this.props.payBank(this.refs.bank.value);
	};

	render() {
		return (
			<form onSubmit={this.payBank}>
				<div>
					<SmallButton
						text={this.props.text}
						color={'blue'}
						type={'submit'}
					/>
					<div>
						<input
							ref="bank"
							type="number"
							placeholder="Amount to bank"
							defaultValue={0}
						></input>
					</div>
				</div>
			</form>
		);
	}
}

export default PayBank;
