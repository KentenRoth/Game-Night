import React from 'react';
import data from '../../../Data/property.json';

import SmallButton from '../../Buttons/SmallButton';

class BuyProperty extends React.Component {
	propertyList = () => {
		let allProperties = data;
		let ownedProperties = this.props.properties;

		var openProperties = allProperties.filter(function(objFromA) {
			return !ownedProperties.find(function(objFromB) {
				return objFromA.Deed === objFromB.Deed;
			});
		});

		return openProperties.map(property => (
			<option key={property.Deed} value={property.Deed}>
				{property.Deed} ${property.Price}
			</option>
		));
	};

	buyThisProperty = e => {
		e.preventDefault();
		this.props.BuyProperty(this.refs.property.value);
	};

	render() {
		return (
			<form onSubmit={this.buyThisProperty}>
				<div>
					<SmallButton
						text={'Buy property'}
						color={'green'}
						type="submit"
					/>
					<div>
						<select ref="property">{this.propertyList()}</select>
					</div>
				</div>
			</form>
		);
	}
}

export default BuyProperty;
