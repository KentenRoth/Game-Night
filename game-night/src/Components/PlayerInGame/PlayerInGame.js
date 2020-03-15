import React from 'react';
import axios from 'axios';

import SmallButton from '../Buttons/SmallButton';
import PlayerInGameCard from './PlayerInGameCard';
import PropertyCard from './PropertyCard';
import RRPropertyCard from './RRPropertyCard';
import UtilsPropertyCard from './UtilsPropertyCard';

class PlayerInGame extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			player: {},
			playerProperty: [],
			allPlayers: [],
			playerID: localStorage.getItem('playerID'),
			playerToken: localStorage.getItem('playerAuthToken'),
			gameID: localStorage.getItem('gameID'),
			gameToken: localStorage.getItem('gameAuthToken')
		};
	}

	componentDidMount() {
		const playerID = this.state.playerID;
		const playerToken = this.state.playerToken;
		const gameToken = this.state.gameToken;
		const configPlayer = {
			headers: {
				Authorization: 'Bearer ' + playerToken
			}
		};
		const configGame = {
			headers: {
				Authorization: 'Bearer ' + gameToken
			}
		};
		axios.get(`/ingameuser/${playerID}`, configPlayer).then(res => {
			this.setState({
				player: res.data,
				playerProperty: res.data.property
			});
		});
		axios.get('/ingameuser', configGame).then(res => {
			this.setState({ allPlayers: res.data });
		});
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
							<p>Money </p>
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
						<SmallButton text={'Buy Property'} color={'green'} />
						<SmallButton text={'Pay Rent'} color={'green'} />
						<SmallButton text={'Pay Player'} color={'blue'} />
						<SmallButton text={'Pay Bank'} color={'blue'} />
						<SmallButton text={'Pay Taxes'} color={'green'} />
						<SmallButton text={'Passed Go'} color={'green'} />
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
}

export default PlayerInGame;
