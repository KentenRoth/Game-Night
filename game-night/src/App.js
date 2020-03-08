import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import CreateGame from './Components/CreateGame/CreateGame';
import GameLogin from './Components/GameLogin/GameLogin';
import CreatePlayer from './Components/CreatePlayer/CreatePlayer';
import InGame from './Components/InGame/InGame';
import PlayerInGame from './Components/PlayerInGame/PlayerInGame';
import './App.css';

function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" component={Login} exact />
				<Route path="/login" component={Login} />
				<Route path="/signup" component={SignUp} />
				<Route path="/creategame" component={CreateGame} />
				<Route path="/gamelogin" component={GameLogin} />
				<Route path="/createplayer" component={CreatePlayer} />
				<Route path="/ingame" component={InGame} />
				<Route path="/playeringame" component={PlayerInGame} />
			</Switch>
		</BrowserRouter>
	);
}

export default App;
