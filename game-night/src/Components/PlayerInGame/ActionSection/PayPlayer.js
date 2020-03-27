import React from 'react';

import SmallButton from '../../Buttons/SmallButton';

class PayPlayer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<form>
				<div>
					<SmallButton
						text={this.props.text}
						color={'green'}
						type={'submit'}
					/>
					<div>
						<select ref="player"></select>
					</div>
					<input type="number" />
				</div>
			</form>
		);
	}
}

export default PayPlayer;
