import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
import CreateGame from './Components/CreateGame/CreateGame';
import GameLogin from './Components/GameLogin/GameLogin';
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
			</Switch>
		</BrowserRouter>
	);
}

export default App;
