import React from 'react';
import axios from 'axios';

import SmallButton from '../Buttons/SmallButton';

// Action Section
import PlayerInGameCard from './PlayerInGameCard';
import PayRent from './ActionSection/PayRent';
import PayBank from './ActionSection/PayBank';
import PayTaxes from './ActionSection/PayTaxes';

// Property Cards
import PropertyCard from './PropertyCards/PropertyCard';
import RRPropertyCard from './PropertyCards/RRPropertyCard';
import UtilsPropertyCard from './PropertyCards/UtilsPropertyCard';

class PlayerInGame extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			taxes: 0,
			rentAmount: 0,
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

	// Paying Rent Amount.  Needs to figure out what player to pay to
	payRent = value => {
		this.setState({ rentAmount: value });
	};

	// Paying Bank a set amount.
	payBank = value => {
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
						<div>
							<SmallButton text={'Passed Go'} color={'green'} />
						</div>
						<SmallButton text={'Buy Property'} color={'green'} />
						<PayTaxes
							text={'Pay Taxes'}
							player={this.state.player}
						/>
						<div className="row">
							<div className="col-6">
								<PayRent
									allPlayers={this.state.allPlayers}
									text={'Pay Rent'}
									payRent={this.payRent}
								/>
							</div>
							<div className="col-6">
								<PayBank
									text={'Pay Bank'}
									payBank={this.payBank}
								/>
							</div>
						</div>

						<SmallButton text={'Pay Player'} color={'green'} />
						<SmallButton text={'Sell Property'} color={'blue'} />
						<SmallButton text={'Pay Utilities'} color={'blue'} />
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
}

export default PlayerInGame;
