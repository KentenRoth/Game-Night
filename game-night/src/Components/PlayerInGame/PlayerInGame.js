import React from 'react';
// import axios from 'axios';
import data from '../../Data/property.json';

import SmallButton from '../Buttons/SmallButton';

// Action Section
import BuyProperty from './ActionSection/BuyProperty';
import PlayerInGameCard from './PlayerInGameCard';
import PayRent from './ActionSection/PayRent';
import PayBank from './ActionSection/PayBank';
import PayTaxes from './ActionSection/PayTaxes';
import PayPlayer from './ActionSection/PayPlayer';
import PayUtilities from './ActionSection/PayUtilities';
import SellProperty from './ActionSection/SellProperty';

// Property Cards
import PropertyCard from './PropertyCards/PropertyCard';
import RRPropertyCard from './PropertyCards/RRPropertyCard';
import UtilsPropertyCard from './PropertyCards/UtilsPropertyCard';

class PlayerInGame extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			taxes: 0,
			player: {},
			playerProperty: [],
			allPlayers: [],
			allPropertiesOwned: [],
			playerID: localStorage.getItem('playerID'),
			playerToken: localStorage.getItem('playerAuthToken'),
			gameID: localStorage.getItem('gameID'),
			gameToken: localStorage.getItem('gameAuthToken')
		};
	}

	componentDidUpdate(prevProps) {
		if (prevProps !== this.props) {
			this.setState({
				player: this.props.playerData.player,
				playerProperty: this.props.playerData.player.property,
				allPlayers: this.nonPlayer(),
				allPropertiesOwned: this.props.playerData.allPropertiesOwned
			});
			this.nonPlayer();
			this.getPlayerData();
		}

		return;
	}

	getPlayerData = () => {
		let me;
		var myPlayer = this.props.playerData.player._id;
		this.props.playerData.allPlayers.map(player => {
			if (player._id !== myPlayer) {
				return [];
			}
			return (me = player);
		});
		return me;
	};

	nonPlayer = () => {
		var notPlayer = this.props.playerData.player._id;
		let array = this.props.playerData.allPlayers;
		return (array = array.filter(player => player._id !== notPlayer));
	};

	componentDidMount() {
		this.props.getData();
	}

	// Buy Property.
	buyProperty = value => {
		let allProperties = data;
		let propertyToBuy;
		allProperties.map(property => {
			if (property.Deed === value) {
				return (propertyToBuy = property);
			}
			return [];
		});
		return propertyToBuy;
	};

	// Paying Rent Amount.  Needs to figure out what player to pay to
	payRent = value => {
		let pay = {
			rentAmount: 0,
			playerID: ''
		};
		this.state.allPlayers.map(player => {
			player.property.map(property => {
				if (property.Deed === value) {
					pay.rentAmount = property.Rent;
					return (pay.playerID = player._id);
				}
				return [];
			});
			return [];
		});

		if (pay.rentAmount > this.state.player.money) {
			return console.log('Nope');
		}
		return pay;
	};

	// Needs to check to see if owner has both utilities.
	payUtilities = value => {
		console.log(value);
	};

	// Pay Player.  Needs to make sure $$ is entered.
	payPlayer = value => {
		console.log(value);
	};

	// Paying Bank a set amount.
	payBank = value => {
		console.log(value);
	};

	sellProperty = value => {
		console.log(value);
	};

	render() {
		return (
			<div style={this.container}>
				<div className="box">
					<div style={this.content}>
						{this.state.allPlayers.map(player => {
							if (this.state.player._id !== player._id) {
								return (
									<PlayerInGameCard
										players={player}
										key={player._id}
									/>
								);
							}
							return <div></div>;
						})}
					</div>
				</div>
				<div style={this.playerContent}>
					<div style={this.title}>
						<p>{this.state.player.name}</p>
					</div>
					<hr style={this.hrStyle} />
					<div className="row">
						<div className="col-6">
							<p>Cash</p>
							<div style={this.moneyStyle}>
								{this.state.player.money}
							</div>
						</div>
						<div className="col-6">
							<p>Net Worth </p>
							<div style={this.netStyle}>
								{this.state.player.netWorth}
							</div>
						</div>
					</div>
					<hr style={this.hrStyle} />
					<div>
						<div style={this.addPadding}>
							<SmallButton text={'Passed Go'} color={'green'} />
							<p style={this.textP}>
								Collect{' '}
								<span style={this.moneyStyle}>$200</span>
							</p>
						</div>
						<div className="row">
							<div style={this.actionArea} className="col-6">
								<BuyProperty
									text={'Buy Property'}
									properties={this.state.allPropertiesOwned}
									BuyProperty={this.buyProperty}
								/>
							</div>
							<div style={this.actionArea} className="col-6">
								<PayTaxes
									text={'Pay Taxes'}
									player={this.state.player}
								/>
							</div>
						</div>

						<div className="row">
							<div style={this.actionArea} className="col-6">
								<PayRent
									allPlayers={this.state.allPlayers}
									text={'Pay Rent'}
									payRent={this.payRent}
								/>
							</div>
							<div style={this.actionArea} className="col-6">
								<PayBank
									text={'Pay Bank'}
									payBank={this.payBank}
								/>
							</div>
						</div>

						<div className="row">
							<div style={this.actionArea} className="col-6">
								<PayPlayer
									allPlayers={this.state.allPlayers}
									text={'Pay Player'}
									payPlayer={this.payPlayer}
								/>
							</div>
							<div style={this.actionArea} className="col-6">
								<PayUtilities
									text={'Pay Utilities'}
									utilities={this.state.allPlayers}
									payUtilities={this.payUtilities}
								/>
							</div>
						</div>
						<div style={this.addPadding}>
							<SellProperty
								text={'Sell Property'}
								player={this.state.player}
								otherPlayers={this.state.allPlayers}
								sellProperty={this.sellProperty}
							/>
						</div>
					</div>
					<hr style={this.hrStyle} />
					<div>
						<p>My Properties</p>
					</div>
					<div style={this.content}>
						{this.state.playerProperty.map(property => {
							if (
								property.Deed === 'Electric Company' ||
								property.Deed === 'Water Works'
							) {
								return (
									<UtilsPropertyCard
										key={property.Deed}
										property={property}
									/>
								);
							}
							if (property.Deed.includes('R.R.')) {
								return (
									<RRPropertyCard
										key={property.Deed}
										property={property}
									/>
								);
							}
							return (
								<PropertyCard
									key={property.Deed}
									property={property}
								/>
							);
						})}
					</div>
				</div>
			</div>
		);
	}

	content = {
		display: 'flex',
		flexWrap: 'wrap'
	};

	container = {
		maxWidth: '600px',
		margin: '0 auto',
		padding: '0 1.6rem',
		textAlign: 'center'
	};

	playerContent = {
		background: '#555555',
		border: '2px solid #B7DAF5',
		borderRadius: '10px',
		margin: '15px auto',
		maxWidth: '400px'
	};

	title = {
		fontSize: '20px',
		fontWeight: 'bold'
	};

	hrStyle = {
		border: '0',
		borderTop: '2px solid  #B7DAF5',
		height: '1px',
		margin: '2px auto',
		width: '90%'
	};

	moneyStyle = {
		fontSize: '18px',
		color: '#18f04C'
	};

	netStyle = {
		fontSize: '18px',
		fontWeight: 'bold',
		color: '#18AC4C'
	};

	addPadding = {
		paddingBottom: '10px'
	};

	textP = {
		fontSize: '18px'
	};

	actionArea = {
		background: 'gray',
		border: '1px solid black',
		paddingBottom: '10px'
	};
}

export default PlayerInGame;
