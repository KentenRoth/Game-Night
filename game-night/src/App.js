import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import CreateGame from './Components/CreateGame/CreateGame';
import GameLogin from './Components/GameLogin/GameLogin';
import CreatePlayer from './Components/CreatePlayer/CreatePlayer';
import InGame from './Components/InGame/InGame';
import PlayerInGame from './Components/PlayerInGame/PlayerInGame';
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
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

	componentDidMount() {}

	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/" component={Login} exact />
					<Route path="/login" component={Login} />
					<Route path="/signup" component={SignUp} />
					<Route path="/creategame" component={CreateGame} />
					<Route path="/gamelogin" component={GameLogin} />
					<Route path="/createplayer" component={CreatePlayer} />
					<Route
						path="/ingame"
						render={() => <InGame getData={this.getData} />}
					/>
					<Route
						path="/playeringame"
						render={() => (
							<PlayerInGame
								playerData={this.state}
								getData={this.getData}
							/>
						)}
					/>
				</Switch>
			</BrowserRouter>
		);
	}

	getData = () => {
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
		const inGamePlayers = axios.get('/ingameuser', configGame);
		const inGameUserID = axios.get(`/ingameuser/${playerID}`, configPlayer);

		axios.all([inGamePlayers, inGameUserID]).then(
			axios.spread((...response) => {
				const resOne = response[0];
				const resTwo = response[1];
				this.playersNetWorth(resOne);
				this.myNetWorth(resTwo);
				this.setState({
					allPlayers: resOne.data,
					player: resTwo.data,
					playerProperty: resTwo.data.property,
					allPropertiesOwned: this.allProperties(resOne)
				});
			})
		);
	};

	allProperties = res => {
		let properties = [];
		res.data.map(player => {
			return properties.push(player.property);
		});
		var merged = [].concat.apply([], properties);
		return merged;
	};

	myNetWorth = player => {
		let netWorth = 0;

		player.data.property.map(value => {
			return (netWorth = value.Price + netWorth);
		});
		player.data.netWorth = netWorth + player.data.money;
	};

	playersNetWorth = player => {
		let netWorth = 0;
		player.data.map(getNet => {
			netWorth = 0;
			getNet.property.map(value => {
				return (netWorth = value.Price + netWorth);
			});
			return (getNet.netWorth = netWorth + getNet.money);
		});
	};
}

export default App;
