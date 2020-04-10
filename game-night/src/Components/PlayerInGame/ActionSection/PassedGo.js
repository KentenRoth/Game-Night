import React from 'react';

import SmallButton from '../../Buttons/SmallButton';

class PassedGo extends React.Component {
	collect = (e) => {
		e.preventDefault();
		this.props.collectMoney();
	};

	render() {
		return (
			<form onSubmit={this.collect}>
				<div style={this.addPadding}>
					<SmallButton
						text={'Passed Go'}
						color={'green'}
						onclick={this.passedGo}
					/>
					<p style={this.textP}>
						Collect: <span style={this.moneyStyle}>$200</span>
					</p>
				</div>
			</form>
		);
	}

	addPadding = {
		paddingBottom: '10px',
	};

	moneyStyle = {
		fontSize: '18px',
		color: '#18f04C',
	};
}

export default PassedGo;
