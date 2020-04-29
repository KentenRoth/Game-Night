import React from 'react';
import axios from 'axios';
import data from '../../Data/property.json';

// Action Section
import PassedGo from './ActionSection/PassedGo';
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
			gameToken: localStorage.getItem('gameAuthToken'),
		};
	}

	componentDidUpdate(prevProps) {
		if (prevProps !== this.props) {
			this.setState({
				player: this.props.playerData.player,
				playerProperty: this.props.playerData.player.property,
				allPlayers: this.nonPlayer(),
				allPropertiesOwned: this.props.playerData.allPropertiesOwned,
			});
			this.nonPlayer();
			this.getPlayerData();
		}

		return;
	}

	getPlayerData = () => {
		let me;
		var myPlayer = this.props.playerData.player._id;
		this.props.playerData.allPlayers.map((player) => {
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
		return (array = array.filter((player) => player._id !== notPlayer));
	};

	componentDidMount() {
		this.props.getData();
	}

	passedGo = () => {
		const cash = this.state.player.money;
		const id = this.state.player._id;

		axios
			.patch(`/ingameuser/${id}`, {
				money: cash + 200,
			})
			.then((res) => {
				console.log(res);
			});
	};

	// Buy Property.
	// Need check for #88368D Purple
	// Need check for #0F76C0 Dark Blue
	buyProperty = (value) => {
		let allProperties = data;
		let propertyToBuy;
		let playerFunds = this.state.player.money;
		let id = this.state.player._id;
		let myProperties = this.state.playerProperty;
		allProperties.map((property) => {
			if (property.Deed === value) {
				return (propertyToBuy = property);
			}
			return [];
		});

		if (playerFunds < propertyToBuy.Price) {
			return console.log('Nope');
		}

		myProperties.push(propertyToBuy);

		let doIOwnAllColors = myProperties.filter(function (property) {
			return property.Color === propertyToBuy.Color;
		});

		if (doIOwnAllColors[0].Color === '#999999') {
			let allProperties = [];
			this.state.playerProperty.filter((property) => {
				if (property.Color !== '#999999') {
					return allProperties.push(property);
				}
				if (doIOwnAllColors.length === 2) {
					doIOwnAllColors.map((property) => {
						if (property.Rent === 50) {
							return;
						}
						property.Rent = 50;
						return allProperties.push(property);
					});
				} else if (doIOwnAllColors.length === 3) {
					doIOwnAllColors.map((property) => {
						if (property.Rent === 100) {
							return;
						}
						property.Rent = 100;
						return allProperties.push(property);
					});
				} else if (doIOwnAllColors.length === 4) {
					doIOwnAllColors.map((property) => {
						if (property.Rent === 200) {
							return;
						}
						property.Rent = 200;
						return allProperties.push(property);
					});
				} else {
					allProperties.push(doIOwnAllColors[0]);
				}
				return allProperties;
			});
			return axios
				.patch(`/ingameuser/${id}`, {
					money: playerFunds - propertyToBuy.Price,
					property: myProperties,
				})
				.then((res) => {
					console.log(res);
				});
		}

		// Checking if all Utilties are owned
		if (
			doIOwnAllColors.length === 2 &&
			doIOwnAllColors[0].Color === '#ffffff'
		) {
			let allProperties = [];
			this.state.playerProperty.filter(function (property) {
				if (property.Color !== '#ffffff') {
					return allProperties.push(property);
				}
				return allProperties;
			});
			doIOwnAllColors.map((property) => {
				property.Rent = 10;
				return allProperties.push(property);
			});
			return axios
				.patch(`/ingameuser/${id}`, {
					money: playerFunds - propertyToBuy.Price,
					property: myProperties,
				})
				.then((res) => {
					console.log(res);
				});
		}

		// Checking if basic property of 3 is owned
		if (doIOwnAllColors.length === 3) {
			let ownAllPropertyColor = [];
			this.state.playerProperty.filter(function (property) {
				if (property.Color !== doIOwnAllColors[0].Color) {
					return ownAllPropertyColor.push(property);
				}
				return ownAllPropertyColor;
			});
			doIOwnAllColors.map((property) => {
				property.CanBuyHouse = true;
				property.Rent = property.Rent * 2;
				return ownAllPropertyColor.push(property);
			});
			return axios
				.patch(`/ingameuser/${id}`, {
					money: playerFunds - propertyToBuy.Price,
					property: myProperties,
				})
				.then((res) => {
					console.log(res);
				});
		}

		axios
			.patch(`/ingameuser/${id}`, {
				money: playerFunds - propertyToBuy.Price,
				property: myProperties,
			})
			.then((res) => {
				console.log(res);
			});
	};

	payRent = (value) => {
		const myID = this.state.player._id;
		const playerFunds = this.state.player.money;
		let ownerMoney = 0;
		let pay = {
			rentAmount: 0,
			playerID: '',
		};

		this.state.allPlayers.map((player) => {
			player.property.map((property) => {
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

		this.state.allPlayers.find((player) => {
			if (player._id === pay.playerID) {
				return (ownerMoney = player.money);
			}
			return ownerMoney;
		});
		axios
			.patch(`/ingameuser/${myID}`, {
				money: playerFunds - pay.rentAmount,
			})
			.then((res) => {
				axios.patch(`/ingameuser/${pay.playerID}`, {
					money: ownerMoney + pay.rentAmount,
				});
			});
	};

	// Paying Bank a set amount.
	payBank = (value) => {
		const playerFunds = this.state.player.money;
		const playerID = this.state.player._id;
		if (value === '') {
			return;
		}
		if (value > playerFunds) {
			return console.log('Nope');
		}

		if (value < 0) {
			return;
		}

		axios
			.patch(`/ingameuser/${playerID}`, {
				money: playerFunds - value,
			})
			.then((res) => {
				console.log(res);
			});
	};

	payPlayer = (value) => {
		const playerFunds = this.state.player.money;
		const myID = this.state.player._id;
		let playerGettingPaid = 0;
		const paidAmount = parseInt(value.amount);

		this.state.allPlayers.find((player) => {
			if (player._id === value.player) {
				return (playerGettingPaid = player.money);
			}
			return playerGettingPaid;
		});

		if (Number.isNaN(paidAmount) === true) {
			return;
		}

		axios
			.patch(`/ingameuser/${myID}`, {
				money: playerFunds - value.amount,
			})
			.then((res) => {
				axios.patch(`/ingameuser/${value.player}`, {
					money: parseInt(value.amount) + playerGettingPaid,
				});
			});
	};

	// Needs to pay person that owns property correct amount
	payUtilities = (value) => {
		const myID = this.state.player._id;
		const playerFunds = this.state.player.money;
		let amountPayed = value.diceAmount * value.multiplyBy;
		let playerGettingPaid = 0;
		if (value.diceAmount > 12 && value.diceAmount < 0) {
			return console.log('Nope');
		}

		this.state.allPlayers.find((player) => {
			if (player._id === value.userID) {
				return (playerGettingPaid = player.money);
			}
			return playerGettingPaid;
		});

		axios
			.patch(`/ingameuser/${myID}`, {
				money: playerFunds - amountPayed,
			})
			.then(
				axios.patch(`/ingameuser/${value.userID}`, {
					money: playerGettingPaid + amountPayed,
				})
			);
	};

	// Selling selected property to selected player for entered amount
	sellProperty = (value) => {
		const myID = this.state.player._id;
		const myCash = this.state.player.money;
		const myNewPropertyList = [];
		let soldProperty;

		const playerGettingProperty = this.state.allPlayers.find((player) => {
			return player._id === value.buyer;
		});

		let amountPaying = parseInt(value.amount);
		const propertySold = value.selling;
		const sellerNewPropertyList = [];
		const buyerID = playerGettingProperty._id;
		let buyingPayerCurrentCash = playerGettingProperty.money;

		this.state.playerProperty.find((property) => {
			if (property.Deed !== propertySold) {
				myNewPropertyList.push(property);
			}
			if (property.Deed === propertySold) {
				soldProperty = property;
			}
			return null;
		});

		this.state.playerProperty.filter((property) => {
			if (property.Deed !== propertySold) {
				return sellerNewPropertyList.push(property);
			}
			return [];
		});

		const buyerNewPropertyList = playerGettingProperty.property.concat(
			soldProperty
		);

		if (Number.isNaN(amountPaying) === true) {
			amountPaying = 0;
		}

		axios
			.patch(`/ingameuser/${myID}`, {
				money: myCash + amountPaying,
				property: myNewPropertyList,
			})
			.then(
				axios.patch(`/ingameuser/${buyerID}`, {
					money: buyingPayerCurrentCash - amountPaying,
					property: buyerNewPropertyList,
				})
			);
	};

	render() {
		return (
			<div style={this.container}>
				<div className="box">
					<div style={this.content}>
						{this.state.allPlayers.map((player) => {
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
						<PassedGo
							text={'Passed Go'}
							collectMoney={this.passedGo}
						/>

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
						{this.sortByColor().map((property) => {
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

	sortByColor = () => {
		const property = this.state.playerProperty;
		property.sort(function (a, b) {
			return a.id - b.id;
		});
		return property;
	};

	content = {
		display: 'flex',
		flexWrap: 'wrap',
	};

	container = {
		maxWidth: '600px',
		margin: '0 auto',
		padding: '0 1.6rem',
		textAlign: 'center',
	};

	playerContent = {
		background: '#555555',
		border: '2px solid #B7DAF5',
		borderRadius: '10px',
		margin: '15px auto',
		maxWidth: '400px',
	};

	title = {
		fontSize: '20px',
		fontWeight: 'bold',
	};

	hrStyle = {
		border: '0',
		borderTop: '2px solid  #B7DAF5',
		height: '1px',
		margin: '2px auto',
		width: '90%',
	};

	moneyStyle = {
		fontSize: '18px',
		color: '#18f04C',
	};

	netStyle = {
		fontSize: '18px',
		fontWeight: 'bold',
		color: '#18AC4C',
	};

	addPadding = {
		paddingBottom: '10px',
	};

	textP = {
		fontSize: '18px',
	};

	actionArea = {
		background: 'gray',
		border: '1px solid black',
		paddingBottom: '10px',
	};
}

export default PlayerInGame;
