import React from 'react';
import SmallButton from '../../Buttons/SmallButton';

class CollectFromBank extends React.Component {
	style = {
		margin: '5px',
	};

	getMoneyFromBank = (e) => {
		e.preventDefault();
		let amount = e.target.amount.value;
		this.props.bankPays(amount);
	};

	render() {
		return (
			<form onSubmit={this.getMoneyFromBank}>
				<div>
					<SmallButton text="Collect" color="green" type={'submit'} />
					<div style={this.style}>
						<input
							type="number"
							name="amount"
							placeholder="Collect From Bank"
						/>
					</div>
				</div>
			</form>
		);
	}
}

export default CollectFromBank;
